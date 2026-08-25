package io.trackforge.search.controller;

import io.trackforge.search.dto.SavedFilterDto;
import io.trackforge.search.service.SavedFilterService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/search/filters")
public class SavedFilterController {

    private final SavedFilterService savedFilterService;

    public SavedFilterController(SavedFilterService savedFilterService) {
        this.savedFilterService = savedFilterService;
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<SavedFilterDto>> list() {
        return ResponseEntity.ok(savedFilterService.listForUser());
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<SavedFilterDto> create(@Valid @RequestBody SavedFilterDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(savedFilterService.create(dto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<SavedFilterDto> update(@PathVariable UUID id, @Valid @RequestBody SavedFilterDto dto) {
        return ResponseEntity.ok(savedFilterService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        savedFilterService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
