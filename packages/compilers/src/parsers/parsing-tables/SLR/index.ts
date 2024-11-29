import { augmentGrammar } from "../..";
import { Language } from "../../language";
import { Automaton } from "../../automaton";
import { arithmeticGrammar, jsonGrammar } from "../../tests/mocks";
import { SLRParsingTable } from "./SLR-parsing-table";

const augmentedGrammar = augmentGrammar(jsonGrammar);
const language = new Language(augmentedGrammar);
const automaton = new Automaton(language);
const slrParsingTable = new SLRParsingTable(automaton);

// console.log(slrParsingTable.ACTION_GOTO(10, ""));

const parseTable = {
    "0": {
        id: { action: "shift", nextState: 5, symbol: "id" },
        "(": { action: "shift", nextState: 4, symbol: "(" },
        E: { action: "goto", nextState: 1 },
        T: { action: "goto", nextState: 2 },
        F: { action: "goto", nextState: 3 },
    },
    "1": { "+": { action: "shift", nextState: 6, symbol: "+" }, $: { action: "accept" } },
    "2": {
        "+": { action: "reduce", productionRule: { nonTerminal: "E", production: ["T"] } },
        "*": { action: "shift", nextState: 7, symbol: "*" },
        ")": { action: "reduce", productionRule: { nonTerminal: "E", production: ["T"] } },
        $: { action: "reduce", productionRule: { nonTerminal: "E", production: ["T"] } },
    },
    "3": {
        "+": { action: "reduce", productionRule: { nonTerminal: "T", production: ["F"] } },
        "*": { action: "reduce", productionRule: { nonTerminal: "T", production: ["F"] } },
        ")": { action: "reduce", productionRule: { nonTerminal: "T", production: ["F"] } },
        $: { action: "reduce", productionRule: { nonTerminal: "T", production: ["F"] } },
    },
    "4": {
        id: { action: "shift", nextState: 5, symbol: "id" },
        "(": { action: "shift", nextState: 4, symbol: "(" },
        E: { action: "goto", nextState: 8 },
        T: { action: "goto", nextState: 2 },
        F: { action: "goto", nextState: 3 },
    },
    "5": {
        "+": { action: "reduce", productionRule: { nonTerminal: "F", production: ["id"] } },
        "*": { action: "reduce", productionRule: { nonTerminal: "F", production: ["id"] } },
        ")": { action: "reduce", productionRule: { nonTerminal: "F", production: ["id"] } },
        $: { action: "reduce", productionRule: { nonTerminal: "F", production: ["id"] } },
    },
    "6": {
        id: { action: "shift", nextState: 5, symbol: "id" },
        "(": { action: "shift", nextState: 4, symbol: "(" },
        T: { action: "goto", nextState: 9 },
        F: { action: "goto", nextState: 3 },
    },
    "7": {
        id: { action: "shift", nextState: 5, symbol: "id" },
        "(": { action: "shift", nextState: 4, symbol: "(" },
        F: { action: "goto", nextState: 10 },
    },
    "8": {
        "+": { action: "shift", nextState: 6, symbol: "+" },
        ")": { action: "shift", nextState: 11, symbol: ")" },
    },
    "9": {
        "+": {
            action: "reduce",
            productionRule: { nonTerminal: "E", production: ["E", "+", "T"] },
        },
        "*": { action: "shift", nextState: 7, symbol: "*" },
        ")": {
            action: "reduce",
            productionRule: { nonTerminal: "E", production: ["E", "+", "T"] },
        },
        $: { action: "reduce", productionRule: { nonTerminal: "E", production: ["E", "+", "T"] } },
    },
    "10": {
        "+": {
            action: "reduce",
            productionRule: { nonTerminal: "T", production: ["T", "*", "F"] },
        },
        "*": {
            action: "reduce",
            productionRule: { nonTerminal: "T", production: ["T", "*", "F"] },
        },
        ")": {
            action: "reduce",
            productionRule: { nonTerminal: "T", production: ["T", "*", "F"] },
        },
        $: { action: "reduce", productionRule: { nonTerminal: "T", production: ["T", "*", "F"] } },
    },
    "11": {
        "+": {
            action: "reduce",
            productionRule: { nonTerminal: "F", production: ["(", "E", ")"] },
        },
        "*": {
            action: "reduce",
            productionRule: { nonTerminal: "F", production: ["(", "E", ")"] },
        },
        ")": {
            action: "reduce",
            productionRule: { nonTerminal: "F", production: ["(", "E", ")"] },
        },
        $: { action: "reduce", productionRule: { nonTerminal: "F", production: ["(", "E", ")"] } },
    },
};
