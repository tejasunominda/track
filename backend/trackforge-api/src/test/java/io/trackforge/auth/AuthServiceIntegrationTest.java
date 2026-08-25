package io.trackforge.auth;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import io.trackforge.AbstractIntegrationTest;
import io.trackforge.auth.dto.AuthResponse;
import io.trackforge.auth.dto.LoginRequest;
import io.trackforge.auth.dto.SignupRequest;
import io.trackforge.auth.repository.MembershipRepository;
import io.trackforge.auth.service.AuthService;
import io.trackforge.common.exception.UnauthorizedException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

class AuthServiceIntegrationTest extends AbstractIntegrationTest {

    @Autowired
    AuthService authService;

    @Autowired
    MembershipRepository membershipRepository;

    @Test
    @Transactional
    void signup_creates_tenant_and_allows_login() {
        SignupRequest signup = new SignupRequest(
                "TrackForge Engineering",
                "trackforge-eng",
                "admin@trackforge.example",
                "Correct-Horse-Battery-Staple!42",
                "Alice Admin");

        AuthResponse created = authService.signup(signup);
        assertThat(created.accessToken()).isNotBlank();
        assertThat(created.refreshToken()).isNotBlank();

        LoginRequest login = new LoginRequest(
                "trackforge-eng",
                "admin@trackforge.example",
                "Correct-Horse-Battery-Staple!42",
                null);

        AuthResponse loggedIn = authService.login(login);
        assertThat(loggedIn.accessToken()).isNotBlank();
    }

    @Test
    @Transactional
    void login_fails_with_wrong_password() {
        authService.signup(new SignupRequest(
                "Acme",
                "acme",
                "user@acme.example",
                "Very-Strong-Password-123!",
                "U. User"));

        assertThatThrownBy(() -> authService.login(new LoginRequest(
                "acme",
                "user@acme.example",
                "wrong-password",
                null)))
                .isInstanceOf(UnauthorizedException.class);
    }
}
