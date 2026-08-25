package io.trackforge.search.tql;

public sealed interface TqlNode {

    record Comparison(String field, String operator, String value) implements TqlNode {
    }

    record And(TqlNode left, TqlNode right) implements TqlNode {
    }

    record Or(TqlNode left, TqlNode right) implements TqlNode {
    }
}
