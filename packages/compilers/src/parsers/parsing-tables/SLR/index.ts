import { augmentGrammar } from "../..";
import { Language } from "../../language";
import { LR0Automaton } from "../../LR0";
import { arithmeticGrammar } from "../../tests/mocks";
import { SLRParsingTable } from "./SLR-parsing-table";

const augmentedGrammar = augmentGrammar(arithmeticGrammar);
const language = new Language(augmentedGrammar);
const automaton = new LR0Automaton(language);
const slrParsingTable = new SLRParsingTable(automaton);
