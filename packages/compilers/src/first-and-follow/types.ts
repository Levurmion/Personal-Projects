import type { Grammar, Token } from "../types";
import type { ArrayElementType } from "../utility-types";

export type NonTerminalSymbolSets<GTokenTypes extends string, GNonTerminalTypes extends string> = {
    [NonTerminal in GNonTerminalTypes]: Set<GTokenTypes>;
};

export interface FirstAndFollowSets<GTokenTypes extends string, GNonTerminalTypes extends string> {
    FIRST: NonTerminalSymbolSets<GTokenTypes, GNonTerminalTypes>;
    FOLLOW: NonTerminalSymbolSets<GTokenTypes, GNonTerminalTypes>;
}

export type GetFirstAndFollow = <
    GTokens extends readonly Token[],
    GNonTerminals extends readonly string[],
>(
    grammar: Grammar<GTokens, GNonTerminals>,
) => FirstAndFollowSets<ArrayElementType<GTokens>["type"], ArrayElementType<GNonTerminals>>;
