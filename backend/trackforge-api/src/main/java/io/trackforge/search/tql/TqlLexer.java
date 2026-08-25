package io.trackforge.search.tql;

import java.util.ArrayList;
import java.util.List;

public class TqlLexer {

    private final String input;
    private int pos;

    public TqlLexer(String input) {
        this.input = input;
        this.pos = 0;
    }

    public List<TqlToken> tokenize() {
        List<TqlToken> tokens = new ArrayList<>();
        while (pos < input.length()) {
            char c = input.charAt(pos);
            if (Character.isWhitespace(c)) {
                pos++;
                continue;
            }
            if (c == '(') {
                tokens.add(new TqlToken(TqlToken.TokenType.LPAREN, "("));
                pos++;
            } else if (c == ')') {
                tokens.add(new TqlToken(TqlToken.TokenType.RPAREN, ")"));
                pos++;
            } else if (c == '=') {
                tokens.add(new TqlToken(TqlToken.TokenType.EQ, "="));
                pos++;
            } else if (c == '!' && peek(1) == '=') {
                tokens.add(new TqlToken(TqlToken.TokenType.NEQ, "!="));
                pos += 2;
            } else if (c == '"' || c == '\'') {
                tokens.add(readString(c));
            } else if (Character.isDigit(c)) {
                tokens.add(readNumber());
            } else if (Character.isLetter(c) || c == '_') {
                tokens.add(readIdentifier());
            } else {
                throw new IllegalArgumentException("Unexpected character: " + c + " at " + pos);
            }
        }
        tokens.add(new TqlToken(TqlToken.TokenType.EOF, ""));
        return tokens;
    }

    private TqlToken readString(char quote) {
        pos++;
        StringBuilder sb = new StringBuilder();
        while (pos < input.length() && input.charAt(pos) != quote) {
            sb.append(input.charAt(pos));
            pos++;
        }
        if (pos >= input.length()) throw new IllegalArgumentException("Unterminated string");
        pos++;
        return new TqlToken(TqlToken.TokenType.STRING, sb.toString());
    }

    private TqlToken readNumber() {
        StringBuilder sb = new StringBuilder();
        while (pos < input.length() && Character.isDigit(input.charAt(pos))) {
            sb.append(input.charAt(pos));
            pos++;
        }
        return new TqlToken(TqlToken.TokenType.NUMBER, sb.toString());
    }

    private TqlToken readIdentifier() {
        StringBuilder sb = new StringBuilder();
        while (pos < input.length() && (Character.isLetterOrDigit(input.charAt(pos)) || input.charAt(pos) == '_')) {
            sb.append(input.charAt(pos));
            pos++;
        }
        String word = sb.toString();
        if (word.equalsIgnoreCase("AND")) return new TqlToken(TqlToken.TokenType.AND, word);
        if (word.equalsIgnoreCase("OR")) return new TqlToken(TqlToken.TokenType.OR, word);
        return new TqlToken(TqlToken.TokenType.IDENT, word);
    }

    private char peek(int offset) {
        int idx = pos + offset;
        return idx < input.length() ? input.charAt(idx) : '\0';
    }
}
