import { createGrammar } from "..";
import type { EnumeratedProductionRules } from "../utilities/enumerate-production-rules";
import type { ProductionRuleInvertedIndex } from "../utilities/generate-inverted-index";

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

export const mockEnumeratedProductionRules: EnumeratedProductionRules = {
    "0": { nonTerminal: "E", productionRule: ["E", "+", "T"] },
    "1": { nonTerminal: "E", productionRule: ["T"] },
    "2": { nonTerminal: "T", productionRule: ["T", "*", "F"] },
    "3": { nonTerminal: "T", productionRule: ["F"] },
    "4": { nonTerminal: "F", productionRule: ["(", "E", ")"] },
    "5": { nonTerminal: "F", productionRule: ["number"] },
};

export const mockProductionRuleInvertedIndex: ProductionRuleInvertedIndex = {
    E: [
        { nonTerminal: "E", productionRule: ["E", "+", "T"] },
        { nonTerminal: "F", productionRule: ["(", "E", ")"] },
    ],
    T: [
        { nonTerminal: "E", productionRule: ["E", "+", "T"] },
        { nonTerminal: "E", productionRule: ["T"] },
        { nonTerminal: "T", productionRule: ["T", "*", "F"] },
    ],
    F: [
        { nonTerminal: "T", productionRule: ["T", "*", "F"] },
        { nonTerminal: "T", productionRule: ["F"] },
    ],
    "(": [{ nonTerminal: "F", productionRule: ["(", "E", ")"] }],
    ")": [{ nonTerminal: "F", productionRule: ["(", "E", ")"] }],
    "*": [{ nonTerminal: "T", productionRule: ["T", "*", "F"] }],
    "+": [{ nonTerminal: "E", productionRule: ["E", "+", "T"] }],
    number: [{ nonTerminal: "F", productionRule: ["number"] }],
};
