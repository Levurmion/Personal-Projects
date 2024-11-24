import { describe, expect, test } from "vitest";
import { enumerateProductionRules } from "./enumerate-production-rules";
import { mockEnumeratedProductionRules, mockGrammar } from "../tests/mocks";

describe("enumerateProductionRules Testing Suite", () => {
    test("function correctly enumerates all production rules", () => {
        const enumeratedProductionRules = enumerateProductionRules(mockGrammar);

        for (const [id, productionRule] of Object.entries(enumeratedProductionRules)) {
            const mockProductionRule = mockEnumeratedProductionRules[id as unknown as number];
            expect(mockProductionRule.nonTerminal).toBe(productionRule.nonTerminal);
            expect(mockProductionRule.productionRule).toEqual(productionRule.productionRule);
        }
    });
});
