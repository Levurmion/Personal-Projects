import { augmentGrammar } from "../..";
import { Language } from "../../language";
import { Automaton } from "../../automaton";
import { arithmeticGrammar } from "../../tests/mocks";
import { SLRParsingTable } from "./SLR-parsing-table";

const augmentedGrammar = augmentGrammar(arithmeticGrammar);
const language = new Language(augmentedGrammar);
const automaton = new Automaton(language);
const slrParsingTable = new SLRParsingTable(automaton);

console.log(slrParsingTable.ACTION_GOTO(10, "*"));
