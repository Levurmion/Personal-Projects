import { augmentGrammar } from "..";
import { Language } from "../language";
import { arithmeticGrammar, cyclicGrammar } from "../tests/mocks";
import { LR0Automaton } from "./automaton";
import { LR0Item } from "./item";

const augmentedGrammar = augmentGrammar(arithmeticGrammar);
const augmentedLanguage = new Language(augmentedGrammar);
const automaton = new LR0Automaton(augmentedLanguage);

console.log(automaton.DFAStates);
