import { augmentGrammar } from "..";
import { Automaton } from "../automaton";
import { Language } from "../language";
import { Lexer } from "../lexer";
import { SLRParsingTable } from "../parsing-tables/SLR/SLR-parsing-table";
import { arithmeticGrammar, extendedJsonGrammar, jsonGrammar } from "../tests/mocks";
import { ShiftReduceParser } from "./shift-reduce-parser";

const augmentedJsonGrammar = augmentGrammar(arithmeticGrammar);
const lexer = new Lexer(augmentedJsonGrammar);
const parser = new ShiftReduceParser(augmentedJsonGrammar, SLRParsingTable);

lexer.tokenize(`x + y * z + id`);

const result = parser.parseTokens(lexer.tokenStream);
console.log(JSON.stringify(parser.parseTree));

const language = new Language(augmentedJsonGrammar);
const automaton = new Automaton(language);
const parsingTable = new SLRParsingTable(automaton);
