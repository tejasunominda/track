package io.trackforge.common.exception;

/**
 * Consistent error envelope returned by all API endpoints
 * (see Technical Architecture Document §5): { "error": { code, message, traceId } }.
 */
public record ApiError(String code, String message, String traceId) {
}
