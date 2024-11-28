import { augmentGrammar } from "..";
import { Language } from "../language";
import { jsonGrammar } from "../tests/mocks";

const augmentedGrammar = augmentGrammar(jsonGrammar);
const augmentedLanguage = new Language(augmentedGrammar);
console.log(augmentedLanguage);
