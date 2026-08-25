package io.trackforge.common.config;

import io.trackforge.common.tenant.TenantAwareDataSource;
import javax.sql.DataSource;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.stereotype.Component;

/**
 * Wraps the auto-configured primary {@link DataSource} with the
 * {@link TenantAwareDataSource} RLS backstop (Technical Architecture
 * Document §3). This avoids replacing Spring Boot's data-source
 * autoconfiguration and keeps {@code DataSourceProperties} available for
 * other consumers.
 */
@Component
public class TenantAwareDataSourcePostProcessor implements BeanPostProcessor {

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        if (bean instanceof DataSource dataSource && !(bean instanceof TenantAwareDataSource)) {
            return new TenantAwareDataSource(dataSource);
        }
        return bean;
    }
}
