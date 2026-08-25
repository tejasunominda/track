package io.trackforge.auth.service;

import io.trackforge.auth.dto.AuthResponse;
import io.trackforge.auth.dto.LoginRequest;
import io.trackforge.auth.dto.SignupRequest;
import io.trackforge.auth.model.Membership;
import io.trackforge.auth.model.OrgRole;
import io.trackforge.auth.model.Organization;
import io.trackforge.auth.model.RefreshToken;
import io.trackforge.auth.model.User;
import io.trackforge.auth.repository.MembershipRepository;
import io.trackforge.auth.repository.OrganizationRepository;
import io.trackforge.auth.repository.RefreshTokenRepository;
import io.trackforge.auth.repository.UserRepository;
import io.trackforge.common.exception.ConflictException;
import io.trackforge.common.exception.UnauthorizedException;
import io.trackforge.common.security.JwtService;
import io.trackforge.common.tenant.TenantContext;
import io.trackforge.issue.model.IssueStatus;
import io.trackforge.issue.model.IssueType;
import io.trackforge.issue.model.StatusCategory;
import io.trackforge.issue.repository.IssueStatusRepository;
import io.trackforge.issue.repository.IssueTypeRepository;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;
import java.util.UUID;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Implements tenant provisioning (Feature Ticket [F1-04]) and native email/
 * password authentication with refresh token rotation (Feature Ticket
 * [F2-01], Security & Access Document §2.1).
 */
@Service
public class AuthService {

    private static final Duration REFRESH_TOKEN_TTL = Duration.ofDays(30);

    private final OrganizationRepository organizationRepository;
    private final UserRepository userRepository;
    private final MembershipRepository membershipRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final IssueTypeRepository issueTypeRepository;
    private final IssueStatusRepository issueStatusRepository;

    public AuthService(
            OrganizationRepository organizationRepository,
            UserRepository userRepository,
            MembershipRepository membershipRepository,
            RefreshTokenRepository refreshTokenRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            IssueTypeRepository issueTypeRepository,
            IssueStatusRepository issueStatusRepository) {
        this.organizationRepository = organizationRepository;
        this.userRepository = userRepository;
        this.membershipRepository = membershipRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.issueTypeRepository = issueTypeRepository;
        this.issueStatusRepository = issueStatusRepository;
    }

    /**
     * Creates a new organization (tenant) and its first Org Admin user.
     * Runs with no tenant in context — {@code organizations} and
     * {@code users} are not RLS-protected (see V1__init_baseline.sql).
     */
    @Transactional
    public AuthResponse signup(SignupRequest request) {
        if (organizationRepository.existsBySubdomain(request.subdomain())) {
            throw new ConflictException("SUBDOMAIN_TAKEN", "That subdomain is already in use.");
        }
        if (userRepository.existsByEmailIgnoreCase(request.email())) {
            throw new ConflictException("EMAIL_TAKEN", "An account with that email already exists.");
        }

        Organization organization = organizationRepository.save(
                new Organization(request.organizationName(), request.subdomain()));

        User user = userRepository.save(new User(
                request.email().toLowerCase(),
                passwordEncoder.encode(request.password()),
                request.displayName()));

        // All tenant-scoped seeds must happen under the new tenant context
        // for RLS to allow the insert.
        TenantContext.set(organization.getId());
        try {
            membershipRepository.save(new Membership(organization.getId(), user.getId(), OrgRole.ORG_ADMIN));

            issueTypeRepository.save(new IssueType(organization.getId(), "Epic", 0));
            issueTypeRepository.save(new IssueType(organization.getId(), "Story", 1));
            issueTypeRepository.save(new IssueType(organization.getId(), "Task", 1));
            issueTypeRepository.save(new IssueType(organization.getId(), "Bug", 1));
            issueTypeRepository.save(new IssueType(organization.getId(), "Sub-task", 2));

            issueStatusRepository.save(new IssueStatus(organization.getId(), "To Do", StatusCategory.TODO));
            issueStatusRepository.save(new IssueStatus(organization.getId(), "In Progress", StatusCategory.IN_PROGRESS));
            issueStatusRepository.save(new IssueStatus(organization.getId(), "In Review", StatusCategory.IN_PROGRESS));
            issueStatusRepository.save(new IssueStatus(organization.getId(), "Done", StatusCategory.DONE));
        } finally {
            TenantContext.clear();
        }

        return issueTokens(organization.getId(), user, OrgRole.ORG_ADMIN, null);
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        Organization organization = organizationRepository.findBySubdomain(request.subdomain())
                .orElseThrow(() -> new UnauthorizedException("INVALID_CREDENTIALS", "Invalid organization, email, or password."));

        User user = userRepository.findByEmailIgnoreCase(request.email())
                .orElseThrow(() -> new UnauthorizedException("INVALID_CREDENTIALS", "Invalid organization, email, or password."));

        TenantContext.set(organization.getId());
        try {
            Membership membership = membershipRepository.findByTenantIdAndUserId(organization.getId(), user.getId())
                    .orElseThrow(() -> new UnauthorizedException("INVALID_CREDENTIALS", "Invalid organization, email, or password."));

            if (user.getPasswordHash() == null || !passwordEncoder.matches(request.password(), user.getPasswordHash())) {
                throw new UnauthorizedException("INVALID_CREDENTIALS", "Invalid organization, email, or password.");
            }

            return issueTokens(organization.getId(), user, membership.getOrgRole(), request.deviceFingerprint());
        } finally {
            TenantContext.clear();
        }
    }

    /**
     * Rotates a refresh token: the presented token is revoked and a new one
     * issued in its place. Reuse of an already-revoked token is treated as a
     * compromise signal — all of that user's active refresh tokens are
     * revoked (see Security & Access Document §2.1).
     */
    @Transactional
    public AuthResponse refresh(String presentedToken, String deviceFingerprint) {
        String hash = hash(presentedToken);
        RefreshToken stored = refreshTokenRepository.findByTokenHash(hash)
                .orElseThrow(() -> new UnauthorizedException("INVALID_REFRESH_TOKEN", "Refresh token is invalid or expired."));

        TenantContext.set(stored.getTenantId());
        try {
            if (!stored.isActive()) {
                revokeAllActiveTokensForUser(stored.getTenantId(), stored.getUserId());
                throw new UnauthorizedException("REFRESH_TOKEN_REUSED", "Refresh token has already been used and was revoked.");
            }
            stored.setRevokedAt(Instant.now());
            refreshTokenRepository.save(stored);

            User user = userRepository.findById(stored.getUserId())
                    .orElseThrow(() -> new UnauthorizedException("INVALID_REFRESH_TOKEN", "Refresh token is invalid or expired."));
            Membership membership = membershipRepository.findByTenantIdAndUserId(stored.getTenantId(), stored.getUserId())
                    .orElseThrow(() -> new UnauthorizedException("INVALID_REFRESH_TOKEN", "Refresh token is invalid or expired."));

            return issueTokens(stored.getTenantId(), user, membership.getOrgRole(), deviceFingerprint);
        } finally {
            TenantContext.clear();
        }
    }

    @Transactional
    public void logout(String presentedToken) {
        String hash = hash(presentedToken);
        refreshTokenRepository.findByTokenHash(hash).ifPresent(stored -> {
            TenantContext.set(stored.getTenantId());
            try {
                stored.setRevokedAt(Instant.now());
                refreshTokenRepository.save(stored);
            } finally {
                TenantContext.clear();
            }
        });
    }

    private void revokeAllActiveTokensForUser(UUID tenantId, UUID userId) {
        // Scoped by RLS to `tenantId` already set in TenantContext by the caller.
        refreshTokenRepository.findAll().stream()
                .filter(t -> t.getUserId().equals(userId) && t.isActive())
                .forEach(t -> {
                    t.setRevokedAt(Instant.now());
                    refreshTokenRepository.save(t);
                });
    }

    private AuthResponse issueTokens(UUID tenantId, User user, OrgRole orgRole, String deviceFingerprint) {
        String accessToken = jwtService.issueAccessToken(user.getId(), tenantId, user.getEmail(), orgRole);

        String rawRefreshToken = UUID.randomUUID() + "." + UUID.randomUUID();
        RefreshToken refreshToken = new RefreshToken(
                tenantId, user.getId(), hash(rawRefreshToken), deviceFingerprint, Instant.now().plus(REFRESH_TOKEN_TTL));
        refreshTokenRepository.save(refreshToken);

        return new AuthResponse(accessToken, rawRefreshToken, jwtService.accessTokenTtlSeconds());
    }

    private String hash(String value) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            return Base64.getUrlEncoder().withoutPadding().encodeToString(digest.digest(value.getBytes()));
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException(e);
        }
    }
}
