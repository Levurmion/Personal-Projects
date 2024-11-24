import { Language } from "../language";
import { ReservedTokenTypes, type Grammar, type Token } from "../types";
import type { ArrayElementType } from "../utility-types";
import type { FirstAndFollowSets, NonTerminalSymbolSets } from "./types";

export const getFirstAndFollow = <
    GTokens extends readonly Token[],
    GNonTerminals extends readonly string[],
    GTokenTypes extends string = ArrayElementType<GTokens>["type"],
    GNonTerminalTypes extends string = ArrayElementType<GNonTerminals>,
>(
    language: Language<GTokens, GNonTerminals>,
): FirstAndFollowSets<GTokenTypes, GNonTerminalTypes> => {
    // initialize FIRST and FOLLOW sets
    const firstSets = Object.fromEntries(
        language.grammar.nonTerminals.map((nonTerminal) => [nonTerminal, new Set<string>()]),
    ) as NonTerminalSymbolSets<GTokenTypes, GNonTerminalTypes>;
    const followSets = Object.fromEntries(
        language.grammar.nonTerminals.map((nonTerminal) => [nonTerminal, new Set<string>()]),
    ) as NonTerminalSymbolSets<GTokenTypes, GNonTerminalTypes>;

    return {
        FIRST: firstSets,
        FOLLOW: followSets,
    };
};
