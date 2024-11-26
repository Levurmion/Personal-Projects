import type { ReservedTokenTypes } from "..";
import type { Grammar, Token } from "../types";
import type { ArrayElementType } from "../utility-types";

export type FIRSTSets<GTokenTypes extends string, GNonTerminalTypes extends string> = {
    [NonTerminal in GNonTerminalTypes]: Set<GTokenTypes>;
};

export type FOLLOWSets<GTokenTypes extends string, GNonTerminalTypes extends string> = {
    [NonTerminal in GNonTerminalTypes]: Set<GTokenTypes | ReservedTokenTypes.TERMINATOR>;
};

export interface FirstAndFollowSets<GTokenTypes extends string, GNonTerminalTypes extends string> {
    FIRST: FIRSTSets<GTokenTypes, GNonTerminalTypes>;
    FOLLOW: FOLLOWSets<GTokenTypes, GNonTerminalTypes>;
}

export type GetFirstAndFollow = <
    GTokens extends readonly Token[],
    GNonTerminals extends readonly string[],
>(
    grammar: Grammar<GTokens, GNonTerminals>,
) => FirstAndFollowSets<ArrayElementType<GTokens>["type"], ArrayElementType<GNonTerminals>>;
