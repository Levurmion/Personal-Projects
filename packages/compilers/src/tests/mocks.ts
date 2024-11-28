import { createGrammar, EPSILON } from "../";

export const mockGrammar = createGrammar({
    tokens: [
        { type: "str_lit", regex: /"(.*)"/ },
        { type: "num_lit", regex: /-?\d+(\.\d+)?/ },
        { type: "true", regex: /true/ },
        { type: "false", regex: /false/ },
        { type: "null", regex: /null/ },
        { type: "{", regex: /\{/ },
        { type: "}", regex: /\}/ },
        { type: "[", regex: /\[/ },
        { type: "]", regex: /\]/ },
        { type: ":", regex: /:/ },
        { type: ",", regex: /,/ },
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
