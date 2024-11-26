import type { Grammar, Token } from "./types";

export enum ReservedTokenTypes {
    TERMINATOR = "$",
    EPSILON = "ε",
}

export const TERMINATOR = ReservedTokenTypes.TERMINATOR;
export const EPSILON = ReservedTokenTypes.EPSILON;

export const createGrammar = <GTokens extends Token[], GNonTerminalTypes extends string[]>(
    grammar: Grammar<GTokens, GNonTerminalTypes>,
) => grammar;
