import { describe, expect, test } from "vitest";
import { Language } from "../language";
import { mockGrammar } from "../tests/mocks";
import { getFIRST } from "./FIRST";
import { getFOLLOW } from "./FOLLOW";

const expectedFirstSets: Record<string, string[]> = {
    VALUE: ["true", "false", "null", "str_lit", "num_lit", "{", "["],
    OBJECT: ["{"],
    ARRAY: ["["],
    "ENTRIES?": ["str_lit"],
    ENTRY: ["str_lit"],
    "ENTRY?": [","],
    "ELEMENTS?": ["true", "false", "null", "str_lit", "num_lit", "{", "["],
    "ELEMENT?": [","],
    "{": ["{"],
    "}": ["}"],
    "[": ["["],
    "]": ["]"],
    ":": [":"],
    ",": [","],
    num_lit: ["num_lit"],
    str_lit: ["str_lit"],
    null: ["null"],
    true: ["true"],
    false: ["false"],
};

const expectedFollowSets: Record<string, string[]> = {
    VALUE: ["$", ",", "}", "]"],
    OBJECT: ["$", ",", "}", "]"],
    ARRAY: ["$", ",", "}", "]"],
    "ENTRIES?": ["}"],
    ENTRY: [",", "}"],
    "ENTRY?": ["}"],
    "ELEMENTS?": ["]"],
    "ELEMENT?": ["]"],
};

describe("FIRST and FOLLOW Testing Suite", () => {
    test("getFIRST function computes the correct FIRST sets", () => {
        const language = new Language(mockGrammar);
        const firstSets = getFIRST(language);

        for (const [symbol, firstSet] of Object.entries(firstSets)) {
            expect(Array.from(firstSet).sort()).toEqual(expectedFirstSets[symbol].sort());
        }
    });

    test("getFOLLOW function computes the correct FOLLOW sets", () => {
        const language = new Language(mockGrammar);
        const firstSets = getFIRST(language);
        const followSets = getFOLLOW(language, firstSets);

        for (const [nonTerminal, followSet] of Object.entries(followSets)) {
            expect(Array.from(followSet).sort()).toEqual(expectedFollowSets[nonTerminal].sort());
        }
    });
});
