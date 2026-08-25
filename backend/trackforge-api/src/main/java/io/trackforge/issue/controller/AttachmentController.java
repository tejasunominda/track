package io.trackforge.issue.controller;

import io.trackforge.issue.dto.AttachmentDto;
import io.trackforge.issue.model.Attachment;
import io.trackforge.issue.service.AttachmentService;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.UUID;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1")
public class AttachmentController {

    private final AttachmentService attachmentService;

    public AttachmentController(AttachmentService attachmentService) {
        this.attachmentService = attachmentService;
    }

    @PostMapping("/issues/{issueId}/attachments")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<AttachmentDto> upload(
            @PathVariable UUID issueId,
            @RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.status(HttpStatus.CREATED).body(attachmentService.upload(issueId, file));
    }

    @GetMapping("/issues/{issueId}/attachments")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<AttachmentDto>> list(@PathVariable UUID issueId) {
        return ResponseEntity.ok(attachmentService.listAttachments(issueId));
    }

    @GetMapping("/attachments/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Resource> download(@PathVariable UUID id) throws IOException {
        Attachment attachment = attachmentService.download(id);
        Path path = Path.of(attachment.getStoragePath());
        ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + attachment.getFileName() + "\"")
                .contentType(attachment.getContentType() != null ? MediaType.parseMediaType(attachment.getContentType()) : MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }
}
