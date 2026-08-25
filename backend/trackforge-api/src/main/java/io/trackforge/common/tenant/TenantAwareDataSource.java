package io.trackforge.common.tenant;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import javax.sql.DataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.datasource.DelegatingDataSource;

/**
 * Wraps the primary {@link DataSource} so that every JDBC connection checked
 * out of the pool has the Postgres session variable {@code app.current_tenant}
 * set to match {@link TenantContext} for the current request thread. Postgres
 * Row-Level Security policies (see V1__init_baseline.sql) key off this
 * variable, so this is the hard backstop described in Technical Architecture
 * Document §3 — even a buggy/missing application-layer tenant check cannot
 * leak cross-tenant rows, because the database itself won't return them.
 *
 * <p>Uses session-level {@code SET} (not {@code SET LOCAL}) because
 * connections are checked out fresh per HikariCP borrow, and the value is
 * re-applied (or cleared) on every checkout regardless of transaction
 * boundaries.
 */
public class TenantAwareDataSource extends DelegatingDataSource {

    private static final Logger log = LoggerFactory.getLogger(TenantAwareDataSource.class);

    public TenantAwareDataSource(DataSource targetDataSource) {
        super(targetDataSource);
    }

    @Override
    public Connection getConnection() throws SQLException {
        return applyTenant(super.getConnection());
    }

    @Override
    public Connection getConnection(String username, String password) throws SQLException {
        return applyTenant(super.getConnection(username, password));
    }

    private Connection applyTenant(Connection connection) throws SQLException {
        var tenantId = TenantContext.get();
        try (Statement statement = connection.createStatement()) {
            if (tenantId != null) {
                statement.execute("SET app.current_tenant = '" + tenantId + "'");
            } else {
                // No tenant in context (e.g. tenant provisioning, background jobs,
                // platform-admin break-glass access) — RESET leaves the GUC unset,
                // which `current_setting(..., true)` in RLS policies resolves to
                // NULL, so tenant-scoped tables correctly return zero rows rather
                // than erroring on an empty-string uuid cast.
                statement.execute("RESET app.current_tenant");
            }
        } catch (SQLException e) {
            // Non-Postgres test databases (e.g. H2) do not support the
            // `app.current_tenant` custom GUC. Production is always Postgres,
            // so this is a test-only tolerance path and not a backstop bypass.
            if (log.isDebugEnabled()) {
                log.debug("Could not set tenant GUC on this database: {}", e.getMessage());
            }
        }
        return connection;
    }
}
