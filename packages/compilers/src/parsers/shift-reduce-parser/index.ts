import { augmentGrammar } from "..";
import { Automaton } from "../automaton";
import { Language } from "../language";
import { Lexer } from "../lexer";
import { SLRParsingTable } from "../parsing-tables/SLR/SLR-parsing-table";
import { jsonGrammar } from "../tests/mocks";
import { ShiftReduceParser } from "./shift-reduce-parser";

const augmentedJsonGrammar = augmentGrammar(jsonGrammar);
const lexer = new Lexer(augmentedJsonGrammar);
const parser = new ShiftReduceParser(augmentedJsonGrammar, SLRParsingTable);

lexer.tokenize(`{ "array": [1, 2, 3], "object": { "one": 1, "two": 2 } }`);

const result = parser.parseTokens(lexer.tokenStream);
console.log(JSON.stringify(parser.parseTree));

const language = new Language(augmentedJsonGrammar);
const automaton = new Automaton(language);
const parsingTable = new SLRParsingTable(automaton);

// console.log((parsingTable as any).SLRTable);
