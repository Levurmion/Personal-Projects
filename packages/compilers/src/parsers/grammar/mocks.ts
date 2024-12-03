import { createGrammar } from ".";
import { EPSILON } from ".";

export const arithmeticGrammar = createGrammar({
    terminals: {
        symbols: [
            { type: "+", regex: /(\+)/ },
            { type: "*", regex: /(\*)/ },
            { type: "(", regex: /(\()/ },
            { type: ")", regex: /(\))/ },
        ],
        generics: [
            { type: "id", regex: /([a-zA-Z_]+[a-zA-Z0-9_]*)/ },
            { type: "number", regex: /(\d+(\.\d+)?)/ },
        ],
    } as const,
    nonTerminals: ["E", "T", "F"] as const,
    startSymbol: "E",
    productionRules: {
        E: [{ rule: ["E", "+", "T"], action: "collect" }, { rule: ["T"] }],
        T: [{ rule: ["T", "*", "F"], action: "collect" }, { rule: ["F"] }],
        F: [
            { rule: ["(", "E", ")"] },
            { rule: ["id"], action: "push" },
            { rule: ["number"], action: "push" },
        ],
    },
});

export const simpleSqlGrammar = createGrammar({
    terminals: {
        symbols: [
            { type: ",", regex: /(,)/ },
            { type: ";", regex: /(;)/ },
            { type: "(", regex: /(\()/ },
            { type: ")", regex: /(\))/ },
            { type: "*", regex: /(\*)/ },
        ],
        keywords: [
            { type: "SELECT", regex: /(SELECT)/ },
            { type: "FROM", regex: /(FROM)/ },
        ],
        generics: [{ type: "id", regex: /([a-zA-Z_]+[a-zA-Z0-9_]*)/ }],
    } as const,
    nonTerminals: [
        "STATEMENT",
        "QUERY_EXP",
        "SELECT_CLAUSE",
        "FROM_CLAUSE",
        "COLUMN_IDS",
        "COLUMN_IDS?",
        "TABLE_EXP",
    ] as const,
    startSymbol: "STATEMENT",
    productionRules: {
        STATEMENT: [{ rule: ["QUERY_EXP", ";"] }],
        QUERY_EXP: [{ rule: ["SELECT_CLAUSE", "FROM_CLAUSE"], action: "collect" }],
        SELECT_CLAUSE: [{ rule: ["SELECT", "COLUMN_IDS"], action: "collect" }],
        COLUMN_IDS: [{ rule: ["id", "COLUMN_IDS?"], action: "push" }],
        "COLUMN_IDS?": [{ rule: [",", "id", "COLUMN_IDS?"], action: "push" }, { rule: [EPSILON] }],
        FROM_CLAUSE: [{ rule: ["FROM", "TABLE_EXP"], action: "collect" }],
        TABLE_EXP: [
            { rule: ["id"], action: "push" },
            { rule: ["(", "QUERY_EXP", ")"], action: "collect" },
        ],
    },
});
