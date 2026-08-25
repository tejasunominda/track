package io.trackforge.issue.service;

import io.trackforge.common.exception.NotFoundException;
import io.trackforge.common.security.TrackForgePrincipal;
import io.trackforge.issue.dto.AttachmentDto;
import io.trackforge.issue.model.Attachment;
import io.trackforge.issue.repository.AttachmentRepository;
import io.trackforge.issue.repository.IssueRepository;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AttachmentService {

    private final AttachmentRepository attachmentRepository;
    private final IssueRepository issueRepository;
    private final Path uploadDir;

    public AttachmentService(
            AttachmentRepository attachmentRepository,
            IssueRepository issueRepository,
            @Value("${trackforge.attachments.path:./data/attachments}") String uploadPath) throws IOException {
        this.attachmentRepository = attachmentRepository;
        this.issueRepository = issueRepository;
        this.uploadDir = Paths.get(uploadPath);
        Files.createDirectories(uploadDir);
    }

    @Transactional(readOnly = true)
    public List<AttachmentDto> listAttachments(UUID issueId) {
        if (!issueRepository.existsById(issueId)) {
            throw new NotFoundException("ISSUE_NOT_FOUND", "Issue not found.");
        }
        return attachmentRepository.findByIssueIdOrderByCreatedAtDesc(issueId).stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public AttachmentDto upload(UUID issueId, MultipartFile file) throws IOException {
        TrackForgePrincipal principal = currentPrincipal();
        if (!issueRepository.existsById(issueId)) {
            throw new NotFoundException("ISSUE_NOT_FOUND", "Issue not found.");
        }

        String originalName = file.getOriginalFilename() != null ? file.getOriginalFilename() : "unnamed";
        String safeName = UUID.randomUUID() + "_" + originalName.replaceAll("[^a-zA-Z0-9._-]", "_");
        Path target = uploadDir.resolve(safeName);
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

        Attachment attachment = new Attachment(
                principal.tenantId(), issueId, principal.userId(),
                originalName, file.getContentType(),
                target.toAbsolutePath().toString(), file.getSize());
        attachment.setScanStatus("CLEAN"); // Virus scan stub — Phase 5.
        return toDto(attachmentRepository.save(attachment));
    }

    @Transactional(readOnly = true)
    public Attachment download(UUID attachmentId) {
        TrackForgePrincipal principal = currentPrincipal();
        Attachment attachment = attachmentRepository.findById(attachmentId)
                .orElseThrow(() -> new NotFoundException("ATTACHMENT_NOT_FOUND", "Attachment not found."));
        if (!attachment.getTenantId().equals(principal.tenantId())) {
            throw new AccessDeniedException("Attachment does not belong to this tenant");
        }
        return attachment;
    }

    private AttachmentDto toDto(Attachment a) {
        return new AttachmentDto(
                a.getId(), a.getIssueId(), a.getUploadedBy(),
                a.getFileName(), a.getContentType(), a.getSizeBytes() != null ? a.getSizeBytes() : 0,
                a.getScanStatus(), "/api/v1/attachments/" + a.getId(), a.getCreatedAt());
    }

    private TrackForgePrincipal currentPrincipal() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof TrackForgePrincipal trackForgePrincipal) {
            return trackForgePrincipal;
        }
        throw new AccessDeniedException("User not authenticated");
    }
}
