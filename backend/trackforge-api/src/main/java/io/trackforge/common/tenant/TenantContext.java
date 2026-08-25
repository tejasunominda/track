package io.trackforge.common.tenant;

import java.util.UUID;

/**
 * Thread-local holder for the current request's tenant id, derived from the
 * authenticated JWT's tenant claim by {@link TenantFilter}. Consumed by the
 * persistence layer to set the Postgres `app.current_tenant` session variable
 * that backs Row-Level Security policies (see Technical Architecture Document §3).
 */
public final class TenantContext {

    private static final ThreadLocal<UUID> CURRENT_TENANT = new ThreadLocal<>();

    private TenantContext() {
    }

    public static void set(UUID tenantId) {
        CURRENT_TENANT.set(tenantId);
    }

    public static UUID get() {
        return CURRENT_TENANT.get();
    }

    public static void clear() {
        CURRENT_TENANT.remove();
    }
}
