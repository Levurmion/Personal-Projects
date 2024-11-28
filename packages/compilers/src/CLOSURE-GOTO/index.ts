import { augmentGrammar } from "..";
import { Language } from "../language";
import { mockGrammar } from "../tests/mocks";

const augmentedGrammar = augmentGrammar(mockGrammar);
const augmentedLanguage = new Language(augmentedGrammar);
console.log(augmentedLanguage);
