import { ReservedTokenTypes, type Grammar, type Token } from "../types";
import { generateInvertedIndex } from "../utilities/generate-inverted-index";
import type { ArrayElementType } from "../utility-types";
import type { FirstAndFollowSets, NonTerminalSymbolSets } from "./types";

export const getFirstAndFollow = <
    GTokens extends readonly Token[],
    GNonTerminals extends readonly string[],
    GTokenTypes extends string = ArrayElementType<GTokens>["type"],
    GNonTerminalTypes extends string = ArrayElementType<GNonTerminals>,
>(
    grammar: Grammar<GTokens, GNonTerminals>,
): FirstAndFollowSets<GTokenTypes, GNonTerminalTypes> => {
    const { nonTerminals } = grammar;
    const productionRuleIndex = generateInvertedIndex(grammar);

    // initialize FIRST and FOLLOW sets
    const firstSets = Object.fromEntries(
        nonTerminals.map((nonTerminal) => [nonTerminal, new Set<string>()]),
    ) as NonTerminalSymbolSets<GTokenTypes, GNonTerminalTypes>;
    const followSets = Object.fromEntries(
        nonTerminals.map((nonTerminal) => [nonTerminal, new Set<string>()]),
    ) as NonTerminalSymbolSets<GTokenTypes, GNonTerminalTypes>;

    return {
        FIRST: firstSets,
        FOLLOW: followSets,
    };
};
