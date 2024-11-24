import type { Grammar, Token } from "../types";
import type { ArrayElementType } from "../utility-types";

export type FirstSet<GTokenTypes extends string, GNonTerminalTypes extends string> = {
    [NonTerminal in GNonTerminalTypes]: Set<GTokenTypes>;
};

export type FollowSet<GTokenTypes extends string, GNonTerminalTypes extends string> = {
    [NonTerminal in GNonTerminalTypes]: Set<GTokenTypes>;
};

export interface FirstAndFollowSet<GTokenTypes extends string, GNonTerminalTypes extends string> {
    first: FirstSet<GTokenTypes, GNonTerminalTypes>;
    follow: FollowSet<GTokenTypes, GNonTerminalTypes>;
}

export type GetFirstAndFollow = <
    GTokens extends readonly Token[],
    GNonTerminals extends readonly string[],
>(
    grammar: Grammar<GTokens, GNonTerminals>,
) => FirstAndFollowSet<ArrayElementType<GTokens>["type"], ArrayElementType<GNonTerminals>>;
