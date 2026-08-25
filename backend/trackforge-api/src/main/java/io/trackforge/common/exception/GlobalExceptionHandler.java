package io.trackforge.common.exception;

import jakarta.servlet.http.HttpServletRequest;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Translates exceptions into the consistent error envelope defined by
 * Technical Architecture Document §5:
 * {@code { "error": { "code", "message", "traceId" } } }.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ApiErrorEnvelope> handleApiException(ApiException ex, HttpServletRequest request) {
        String traceId = newTraceId();
        log.warn("[{}] {} {} -> {}", traceId, request.getMethod(), request.getRequestURI(), ex.getMessage());
        return ResponseEntity.status(ex.getStatus())
                .body(new ApiErrorEnvelope(new ApiError(ex.getCode(), ex.getMessage(), traceId)));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiErrorEnvelope> handleAccessDenied(AccessDeniedException ex, HttpServletRequest request) {
        String traceId = newTraceId();
        log.warn("[{}] {} {} -> access denied", traceId, request.getMethod(), request.getRequestURI());
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(new ApiErrorEnvelope(new ApiError("FORBIDDEN", "You do not have permission to perform this action.", traceId)));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorEnvelope> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest request) {
        String traceId = newTraceId();
        String message = ex.getBindingResult().getFieldErrors().stream()
                .findFirst()
                .map(fe -> fe.getField() + " " + fe.getDefaultMessage())
                .orElse("Validation failed");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ApiErrorEnvelope(new ApiError("VALIDATION_ERROR", message, traceId)));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorEnvelope> handleUnexpected(Exception ex, HttpServletRequest request) {
        String traceId = newTraceId();
        log.error("[{}] Unhandled exception on {} {}", traceId, request.getMethod(), request.getRequestURI(), ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiErrorEnvelope(new ApiError("INTERNAL_ERROR", "An unexpected error occurred.", traceId)));
    }

    private String newTraceId() {
        return UUID.randomUUID().toString();
    }

    public record ApiErrorEnvelope(ApiError error) {
    }
}
