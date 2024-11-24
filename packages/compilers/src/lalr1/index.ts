import type { Grammar, Token } from "./types";

export const createGrammar = <GTokens extends Token[], GNonTerminalTypes extends string[]>(
    grammar: Grammar<GTokens, GNonTerminalTypes>,
) => grammar;
