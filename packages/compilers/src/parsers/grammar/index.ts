export type { Terminal, NonTerminal, GrammarConfig, ReservedGrammarTerminalTypes } from "./types";
import { ReservedGrammarTerminalTypes } from "./types";
export { ReservedGrammarTerminalError } from "./errors";
export { createGrammar } from "./grammar";

export const TERMINATOR = ReservedGrammarTerminalTypes.TERMINATOR;
export const EPSILON = ReservedGrammarTerminalTypes.EPSILON;
