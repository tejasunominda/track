package io.trackforge.common.exception;

import org.springframework.http.HttpStatus;

/**
 * Base type for domain exceptions that should be surfaced to API clients as
 * the consistent error envelope (Technical Architecture Document §5).
 */
public class ApiException extends RuntimeException {

    private final HttpStatus status;
    private final String code;

    public ApiException(HttpStatus status, String code, String message) {
        super(message);
        this.status = status;
        this.code = code;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getCode() {
        return code;
    }
}
