package io.trackforge;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/**
 * Base class for integration tests. Uses the in-memory test datasource
 * configured via application-test.yml (H2) so tests run in environments
 * without Docker. A Postgres-specific RLS test can be added later and
 * gated behind an active profile.
 */
@SpringBootTest
@ActiveProfiles("test")
public abstract class AbstractIntegrationTest {
}
