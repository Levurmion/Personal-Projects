import { createGrammar } from "..";

export const mockGrammar = createGrammar({
    tokens: [
        { type: "(", regex: /\(/ },
        { type: ")", regex: /\)/ },
        { type: "*", regex: /\*/ },
        { type: "+", regex: /\+/ },
        { type: "number", regex: /\d+(\.\d+)?/ },
    ] as const,
    nonTerminals: ["E", "T", "F"] as const,
    nonTerminalProductions: {
        E: [["E", "+", "T"], ["T"]],
        T: [["T", "*", "F"], ["F"]],
        F: [["(", "E", ")"], ["number"]],
    },
});
