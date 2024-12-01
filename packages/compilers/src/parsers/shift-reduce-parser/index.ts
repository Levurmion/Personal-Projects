import { augmentGrammar } from "..";
import { Lexer } from "../lexer";
import { SLRParsingTable } from "../parsing-tables/SLR/SLR-parsing-table";
import { jsonGrammar, simpleSqlGrammar } from "../tests/mocks";
import { ShiftReduceParser } from "./shift-reduce-parser";

const augmentedJsonGrammar = augmentGrammar(simpleSqlGrammar);
const lexer = new Lexer(augmentedJsonGrammar);
const parser = new ShiftReduceParser(augmentedJsonGrammar, SLRParsingTable);

lexer.tokenize("SELECT column_a, column_b, column_c FROM ( SELECT column_x FROM table_xyz );");
const result = parser.parseTokens(lexer.tokenStream);

console.log(result);
