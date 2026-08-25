package io.trackforge.admin.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * SAML/OIDC SSO stub (Feature Tickets [F13-01], [F13-02]).
 * Phase 2: add Spring Security SAML2 / OIDC relying party support.
 */
@RestController
@RequestMapping("/api/v1/admin/sso")
public class SamlController {

    @GetMapping("/saml/metadata")
    public ResponseEntity<String> metadata() {
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("SAML metadata endpoint — Phase 2.");
    }
}
