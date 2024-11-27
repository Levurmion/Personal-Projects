import { AUGMENTED_START, augmentGrammar } from "..";
import { Language } from "../language";
import { mockGrammar } from "../tests/mocks";
import { LR0Automaton } from "./automaton";
import { LR0Item } from "./item";

const augmentedGrammar = augmentGrammar(mockGrammar);
const augmentedLanguage = new Language(augmentedGrammar);
const automaton = new LR0Automaton(augmentedLanguage);

const startItem = new LR0Item(augmentedLanguage.getRulesOfNonTerminal(AUGMENTED_START)[0]);
const closureSet = automaton.CLOSURE(startItem);

console.log(closureSet);
console.log(closureSet.gotoSymbols());
