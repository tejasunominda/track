package io.trackforge.search.tql;

import java.util.List;

public class TqlParser {

    private final List<TqlToken> tokens;
    private int pos;

    public TqlParser(List<TqlToken> tokens) {
        this.tokens = tokens;
        this.pos = 0;
    }

    public TqlNode parse() {
        TqlNode node = parseOr();
        if (current().type() != TqlToken.TokenType.EOF) {
            throw new IllegalArgumentException("Unexpected token: " + current().value());
        }
        return node;
    }

    private TqlNode parseOr() {
        TqlNode left = parseAnd();
        while (match(TqlToken.TokenType.OR)) {
            TqlNode right = parseAnd();
            left = new TqlNode.Or(left, right);
        }
        return left;
    }

    private TqlNode parseAnd() {
        TqlNode left = parsePrimary();
        while (match(TqlToken.TokenType.AND)) {
            TqlNode right = parsePrimary();
            left = new TqlNode.And(left, right);
        }
        return left;
    }

    private TqlNode parsePrimary() {
        if (match(TqlToken.TokenType.LPAREN)) {
            TqlNode node = parseOr();
            consume(TqlToken.TokenType.RPAREN, "Expected ')'");
            return node;
        }
        String field = consume(TqlToken.TokenType.IDENT, "Expected field").value();
        String operator;
        if (match(TqlToken.TokenType.EQ)) {
            operator = "=";
        } else if (match(TqlToken.TokenType.NEQ)) {
            operator = "!=";
        } else {
            throw new IllegalArgumentException("Expected = or != after field");
        }
        TqlToken value = current();
        if (value.type() != TqlToken.TokenType.STRING && value.type() != TqlToken.TokenType.IDENT && value.type() != TqlToken.TokenType.NUMBER) {
            throw new IllegalArgumentException("Expected value after operator");
        }
        pos++;
        return new TqlNode.Comparison(field, operator, value.value());
    }

    private boolean match(TqlToken.TokenType type) {
        if (current().type() == type) {
            pos++;
            return true;
        }
        return false;
    }

    private TqlToken consume(TqlToken.TokenType type, String message) {
        if (current().type() != type) {
            throw new IllegalArgumentException(message + ", got " + current().value());
        }
        return tokens.get(pos++);
    }

    private TqlToken current() {
        return tokens.get(pos);
    }
}
