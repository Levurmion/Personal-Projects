import { describe, expect, test } from "vitest";
import { mockEnumeratedProductionRules, mockGrammar } from "../tests/mocks";
import { Language } from ".";

describe("Language Class Testing Suite", () => {
    test("class instantiates with correct attributes", () => {
        const language = new Language(mockGrammar);

        // production rules are correctly instantiated
        for (const [id, productionRule] of Object.entries(language.productionRules)) {
            const mockProductionRule = mockEnumeratedProductionRules[id as unknown as number];
            expect(mockProductionRule.nonTerminal).toBe(productionRule.nonTerminal);
            expect(mockProductionRule.productionRule).toEqual(productionRule.productionRule);
        }

        console.log((language as any).productionRuleInvertedIndex);
    });
});
