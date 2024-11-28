import { describe, expect, test } from "vitest";
import { jsonGrammar } from "../tests/mocks";
import { Language } from ".";

describe("Language Class Testing Suite", () => {
    test("getRulesProducingSymbol retrieves the correct production rules", () => {
        const language = new Language(jsonGrammar);

        const productionRulesForARRAY = language.getRulesProducingSymbol("ARRAY");
        expect(productionRulesForARRAY.length).toBe(1);
        expect(productionRulesForARRAY[0].nonTerminal).toBe("VALUE");
        expect(productionRulesForARRAY[0].production).toEqual(["ARRAY"]);

        const productionRulesForVALUE = language.getRulesProducingSymbol("VALUE");
        expect(productionRulesForVALUE.length).toBe(3);
        expect(productionRulesForVALUE[0].nonTerminal).toBe("ENTRY");
        expect(productionRulesForVALUE[0].production).toEqual(["str_lit", ":", "VALUE"]);
        expect(productionRulesForVALUE[1].nonTerminal).toBe("ELEMENTS?");
        expect(productionRulesForVALUE[1].production).toEqual(["VALUE", "ELEMENT?"]);
        expect(productionRulesForVALUE[2].nonTerminal).toBe("ELEMENT?");
        expect(productionRulesForVALUE[2].production).toEqual([",", "VALUE", "ELEMENT?"]);
    });

    test("getRulesOfNonTerminal retrieves the correct production rules for a non-terminal", () => {
        const language = new Language(jsonGrammar);

        const productionRulesForARRAY = language.getRulesOfNonTerminal("ARRAY");
        expect(productionRulesForARRAY.length).toBe(1);
        expect(productionRulesForARRAY[0].production).toEqual(["[", "ELEMENTS?", "]"]);
    });
});
