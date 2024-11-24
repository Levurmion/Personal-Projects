import { createGrammar } from "..";

export const mockGrammar = createGrammar({
    tokens: [
        { type: "(", regex: /\(/ },
        { type: ")", regex: /\)/ },
        { type: "*", regex: /\*/ },
        { type: "/", regex: /\// },
        { type: "+", regex: /\+/ },
        { type: "-", regex: /\-/ },
        { type: "number", regex: /\d+(\.\d+)?/ },
        { type: "id", regex: /[a-zA-Z_][a-zA-Z0-9_]*/ },
    ] as const,
    nonTerminals: ["E", "T", "F"] as const,
    nonTerminalProductions: {
        E: [["E", "+", "T"], ["E", "-", "T"], ["T"]],
        T: [["T", "*", "F"], ["T", "/", "F"], ["F"]],
        F: [["(", "E", ")"], ["number"], ["id"]],
    },
});
