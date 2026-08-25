package io.trackforge.project;

import static org.assertj.core.api.Assertions.assertThat;

import io.trackforge.AbstractIntegrationTest;
import io.trackforge.auth.dto.AuthResponse;
import io.trackforge.auth.dto.LoginRequest;
import io.trackforge.auth.dto.SignupRequest;
import io.trackforge.project.dto.CreateProjectRequest;
import io.trackforge.project.dto.ProjectSummaryResponse;
import io.trackforge.project.model.ProjectTemplate;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

class ProjectApiIntegrationTest extends AbstractIntegrationTest {

    @Autowired
    TestRestTemplate restTemplate;

    private String accessToken;

    @BeforeEach
    void setUp() {
        SignupRequest signup = new SignupRequest(
                "TrackForge Engineering",
                "trackforge-eng",
                "admin@trackforge.example",
                "Correct-Horse-Battery-Staple!42",
                "Alice Admin");

        AuthResponse auth = restTemplate.postForEntity("/api/v1/auth/signup", signup, AuthResponse.class).getBody();
        assertThat(auth).isNotNull();

        LoginRequest login = new LoginRequest(
                "trackforge-eng",
                "admin@trackforge.example",
                "Correct-Horse-Battery-Staple!42",
                null);

        accessToken = restTemplate.postForEntity("/api/v1/auth/login", login, AuthResponse.class)
                .getBody()
                .accessToken();
    }

    @Test
    void create_and_list_project() {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<CreateProjectRequest> create = new HttpEntity<>(
                new CreateProjectRequest("Engineering", "ENG", "Product engineering team", ProjectTemplate.SCRUM), headers);

        ResponseEntity<ProjectSummaryResponse> created =
                restTemplate.postForEntity("/api/v1/projects", create, ProjectSummaryResponse.class);
        assertThat(created.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(created.getBody().projectKey()).isEqualTo("ENG");

        ResponseEntity<List<ProjectSummaryResponse>> list = restTemplate.exchange(
                "/api/v1/projects",
                HttpMethod.GET,
                new HttpEntity<>(headers),
                new ParameterizedTypeReference<List<ProjectSummaryResponse>>() {});

        assertThat(list.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(list.getBody()).hasSize(1);
        assertThat(list.getBody().getFirst().name()).isEqualTo("Engineering");
    }
}
