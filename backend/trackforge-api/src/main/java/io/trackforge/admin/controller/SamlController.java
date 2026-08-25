package io.trackforge.admin.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * SAML/OIDC SSO stub (Feature Tickets [F13-01], [F13-02]).
 * Real SAML2/OIDC integration requires OpenSAML (Shibboleth repository)
 * and is planned for Phase 2; this endpoint documents the intended flow.
 */
@RestController
@RequestMapping("/api/v1/admin/sso")
public class SamlController {

    @GetMapping("/saml/metadata")
    public ResponseEntity<String> metadata() {
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
                .body("SAML2 SP metadata — requires OpenSAML dependency (Phase 2).");
    }

    @GetMapping("/oidc/config")
    public ResponseEntity<String> oidcConfig() {
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
                .body("OIDC discovery config — Phase 2.");
    }
}
