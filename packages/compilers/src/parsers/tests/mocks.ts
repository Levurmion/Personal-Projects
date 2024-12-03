import { createGrammar, EPSILON } from "../";

export const arithmeticGrammar = createGrammar({
    tokens: [
        { type: "id", regex: /([a-zA-Z_]+[a-zA-Z0-9_]*)/ },
        { type: "number", regex: /(\d+(\.\d+)?)/ },
        { type: "+", regex: /(\+)/, symbol: true },
        { type: "*", regex: /(\*)/, symbol: true },
        { type: "(", regex: /(\()/, symbol: true },
        { type: ")", regex: /(\))/, symbol: true },
    ] as const,
    nonTerminals: ["E", "T", "F"] as const,
    startSymbol: "E",
    nonTerminalProductions: {
        E: [["E", "+", "T"], ["T"]],
        T: [["T", "*", "F"], ["F"]],
        F: [["(", "E", ")"], ["id"]],
    },
});

export const jsonGrammar = createGrammar({
    tokens: [
        { type: "str_lit", regex: /"((\\.|[^"\\])*)"/ },
        { type: "num_lit", regex: /(-?\d+(\.\d+)?)/ },
        { type: "true", reservedKeyword: true },
        { type: "false", reservedKeyword: true },
        { type: "null", reservedKeyword: true },
        { type: "{", regex: /(\{)/, symbol: true },
        { type: "}", regex: /(\})/, symbol: true },
        { type: "[", regex: /(\[)/, symbol: true },
        { type: "]", regex: /(\])/, symbol: true },
        { type: ":", regex: /(:)/, symbol: true },
        { type: ",", regex: /(,)/, symbol: true },
    ] as const,
    nonTerminals: [
        "VALUE",
        "OBJECT",
        "ARRAY",
        "ENTRIES?",
        "ENTRY",
        "ENTRY?",
        "ELEMENTS?",
        "ELEMENT?",
    ] as const,
    startSymbol: "VALUE",
    nonTerminalProductions: {
        VALUE: [["OBJECT"], ["ARRAY"], ["true"], ["false"], ["null"], ["str_lit"], ["num_lit"]],
        OBJECT: [["{", "ENTRIES?", "}"]],
        "ENTRIES?": [["ENTRY", "ENTRY?"], [EPSILON]],
        "ENTRY?": [[",", "ENTRY", "ENTRY?"], [EPSILON]],
        ENTRY: [["str_lit", ":", "VALUE"]],
        ARRAY: [["[", "ELEMENTS?", "]"]],
        "ELEMENTS?": [["VALUE", "ELEMENT?"], [EPSILON]],
        "ELEMENT?": [[",", "VALUE", "ELEMENT?"], [EPSILON]],
    },
});

export const extendedJsonGrammar = createGrammar({
    tokens: [
        { type: "str_lit", regex: /"((\\.|[^"\\])*)"/ },
        { type: "num_lit", regex: /(-?\d+(\.\d+)?)/ },
        { type: "true", reservedKeyword: true },
        { type: "false", reservedKeyword: true },
        { type: "null", reservedKeyword: true },
        { type: "{", regex: /(\{)/, symbol: true },
        { type: "}", regex: /(\})/, symbol: true },
        { type: "[", regex: /(\[)/, symbol: true },
        { type: "]", regex: /(\])/, symbol: true },
        { type: ":", regex: /(:)/, symbol: true },
        { type: ",", regex: /(,)/, symbol: true },
    ] as const,
    nonTerminals: [
        "VALUE",
        "OBJECT",
        "ARRAY",
        "ENTRIES?",
        "ENTRY",
        "ENTRY?",
        "KEY",
        "ELEMENTS?",
        "ELEMENT?",
    ] as const,
    startSymbol: "VALUE",
    nonTerminalProductions: {
        VALUE: [["OBJECT"], ["ARRAY"], ["true"], ["false"], ["null"], ["str_lit"], ["num_lit"]],
        OBJECT: [["{", "ENTRIES?", "}"]],
        "ENTRIES?": [["ENTRY", "ENTRY?"], [EPSILON]],
        "ENTRY?": [[",", "ENTRY", "ENTRY?"], [EPSILON]],
        ENTRY: [["KEY", "VALUE"]],
        KEY: [
            ["str_lit", ":"],
            ["num_lit", ":"],
        ],
        ARRAY: [["[", "ELEMENTS?", "]"]],
        "ELEMENTS?": [["VALUE", "ELEMENT?"], [EPSILON]],
        "ELEMENT?": [[",", "VALUE", "ELEMENT?"], [EPSILON]],
    },
});

export const cyclicGrammar = createGrammar({
    tokens: [{ type: "dummy", regex: /./ }] as const,
    nonTerminals: ["A", "B", "C"] as const,
    startSymbol: "A",
    nonTerminalProductions: {
        A: [["B", "dummy"]],
        B: [["C"]],
        C: [["A"]],
    },
});

export const simpleSqlGrammar = createGrammar({
    tokens: [
        { type: "id", regex: /([a-zA-Z_]+[a-zA-Z0-9_]*)/ },
        { type: "SELECT", reservedKeyword: true },
        { type: "FROM", reservedKeyword: true },
        { type: ",", regex: /(,)/, symbol: true },
        { type: ";", regex: /(;)/, symbol: true },
        { type: "(", regex: /(\()/, symbol: true },
        { type: ")", regex: /(\))/, symbol: true },
        { type: "*", regex: /(\*)/, symbol: true },
    ] as const,
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
    nonTerminalProductions: {
        STATEMENT: [["QUERY_EXP", ";"]],
        QUERY_EXP: [["SELECT_CLAUSE", "FROM_CLAUSE"]],
        SELECT_CLAUSE: [["SELECT", "COLUMN_IDS"]],
        COLUMN_IDS: [["id", "COLUMN_IDS?"]],
        "COLUMN_IDS?": [[",", "id", "COLUMN_IDS?"], [EPSILON]],
        FROM_CLAUSE: [["FROM", "TABLE_EXP"]],
        TABLE_EXP: [["id"], ["(", "QUERY_EXP", ")"]],
    },
});
