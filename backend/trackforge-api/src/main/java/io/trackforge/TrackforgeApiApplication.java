package io.trackforge;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * TrackForge core API — modular monolith entry point.
 *
 * Domain modules (see Technical Architecture Document §2.1):
 * auth, project, issue, workflow, board, sprint, search, notification, webhook, admin.
 * Each module owns its own package, controller/service/repository/model/dto layers,
 * and database tables — no cross-module direct SQL joins.
 */
@SpringBootApplication
public class TrackforgeApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(TrackforgeApiApplication.class, args);
    }
}
