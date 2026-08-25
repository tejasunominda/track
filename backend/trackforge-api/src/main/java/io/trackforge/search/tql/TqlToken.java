package io.trackforge.search.tql;

public record TqlToken(TokenType type, String value) {

    public enum TokenType {
        IDENT, STRING, NUMBER,
        EQ, NEQ,
        LPAREN, RPAREN,
        AND, OR,
        EOF
    }
}
