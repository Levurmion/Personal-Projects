import { describe, expect, test } from "vitest";
import { mockGrammar } from "../tests/mocks";
import { Language } from ".";

describe("Language Class Testing Suite", () => {
    test("getRulesProducingSymbol retrieves the correct production rules", () => {
        const language = new Language(mockGrammar);

        const productionRulesForE = language.getRulesProducingSymbol("E");
        expect(productionRulesForE.length).toBe(3);
        expect(productionRulesForE[0].nonTerminal).toBe("E");
        expect(productionRulesForE[0].production).toEqual(["E", "+", "T"]);
        expect(productionRulesForE[1].nonTerminal).toBe("E");
        expect(productionRulesForE[1].production).toEqual(["E", "-", "T"]);
        expect(productionRulesForE[2].nonTerminal).toBe("F");
        expect(productionRulesForE[2].production).toEqual(["(", "E", ")"]);

        const productionRulesForNumber = language.getRulesProducingSymbol("number");
        expect(productionRulesForNumber.length).toBe(1);
        expect(productionRulesForNumber[0].nonTerminal).toBe("F");
        expect(productionRulesForNumber[0].production).toEqual(["number"]);
    });

    test("getRulesOfNonTerminal retrieves the correct production rules for a non-terminal", () => {
        const language = new Language(mockGrammar);

        const productionRulesForE = language.getRulesOfNonTerminal("E");
        expect(productionRulesForE.length).toBe(3);
        expect(productionRulesForE[0].production).toEqual(["E", "+", "T"]);
        expect(productionRulesForE[1].production).toEqual(["E", "-", "T"]);
        expect(productionRulesForE[2].production).toEqual(["T"]);

        const productionRulesForT = language.getRulesOfNonTerminal("T");
        expect(productionRulesForT.length).toBe(3);
        expect(productionRulesForT[0].production).toEqual(["T", "*", "F"]);
        expect(productionRulesForT[1].production).toEqual(["T", "/", "F"]);
        expect(productionRulesForT[2].production).toEqual(["F"]);
    });
});
