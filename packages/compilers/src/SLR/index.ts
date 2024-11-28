import { augmentGrammar } from "..";
import { Language } from "../language";
import { arithmeticGrammar, cyclicGrammar } from "../tests/mocks";
import { SLRAutomaton } from "./automaton";
import { SLRItem } from "./item";

const augmentedGrammar = augmentGrammar(arithmeticGrammar);
const augmentedLanguage = new Language(augmentedGrammar);
const automaton = new SLRAutomaton(augmentedLanguage);

console.log(automaton.DFAStates);
