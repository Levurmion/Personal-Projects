import { expect, describe, test } from "vitest";
import { AUGMENTED_START, augmentGrammar } from "..";
import { jsonGrammar } from "../tests/mocks";
import { Language } from "../language";
import { Automaton } from "./automaton";
import { Item } from "./item";

describe("Automaton Testing Suite", () => {
    const augmentedGrammar = augmentGrammar(jsonGrammar);
    const language = new Language(augmentedGrammar);
    const automaton = new Automaton(language);

    describe("Automaton.CLOSURE Testing Suite", () => {
        test("CLOSURE correctly computes set from AUGMENTED_START", () => {
            const augmentedStartItem = new Item({
                nonTerminal: AUGMENTED_START,
                production: ["VALUE"],
            });

            const closureSet = automaton.CLOSURE(augmentedStartItem);
            const closureSetRhs = closureSet.map((item) => item.RHS);
            expect(closureSetRhs).toEqual([
                ["•", "VALUE"],
                ["•", "OBJECT"],
                ["•", "ARRAY"],
                ["•", "true"],
                ["•", "false"],
                ["•", "null"],
                ["•", "str_lit"],
                ["•", "num_lit"],
                ["•", "{", "ENTRIES?", "}"],
                ["•", "[", "ELEMENTS?", "]"],
            ]);
        });

        test("CLOSURE correctly computes set where adjacent non-terminal has EPSILON production", () => {
            const coreItem = new Item(
                {
                    nonTerminal: "OBJECT",
                    production: ["{", "ENTRIES?", "}"],
                },
                1,
            );

            const closureSet = automaton.CLOSURE(coreItem);
            const closureSetRhs = closureSet.map((item) => item.RHS);
            expect(closureSetRhs).toEqual([
                ["{", "•", "ENTRIES?", "}"],
                ["•", "ENTRY", "ENTRY?"],
                ["•", "ε"],
                ["•", "str_lit", ":", "VALUE"],
            ]);
        });

        test("CLOSURE does not add new items when starting with a coreItem with a completed production", () => {
            const coreItem = new Item(
                {
                    nonTerminal: "ENTRY",
                    production: ["str_lit", ":", "V"],
                },
                3,
            );

            const closureSet = automaton.CLOSURE(coreItem);
            const closureSetRhs = closureSet.map((item) => item.RHS);
            expect(closureSetRhs).toEqual([["str_lit", ":", "V", "•"]]);
        });
    });

    describe("Automaton.GOTO Testing Suite", () => {
        test("GOTO correctly computes the next set of items given a state and a transition symbol", () => {
            const gotoSet = automaton.GOTO(0, "{");
            expect(gotoSet).not.toBeNull();

            if (gotoSet) {
                const { items } = gotoSet;
                const gotoClosureItemsRhs = items.map((item) => item.RHS);
                expect(gotoClosureItemsRhs).toEqual([
                    ["{", "•", "ENTRIES?", "}"],
                    ["•", "ENTRY", "ENTRY?"],
                    ["•", "ε"],
                    ["•", "str_lit", ":", "VALUE"],
                ]);
            }
        });

        test("GOTO returns null if the current state only has completed items", () => {
            const gotoSet = automaton.GOTO(27, "ELEMENT?");
            expect(gotoSet).toBeNull();
        });
    });
});
