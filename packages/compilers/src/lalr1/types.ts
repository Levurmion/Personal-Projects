import type { ArrayElementType } from "./utility-types";

export enum ReservedTokenTypes {
    TERMINATOR = "$",
    EPSILON = "ε",
}

export interface Token {
    readonly type: string;
    readonly regex: RegExp;
}

export type GrammarProductionRules<GTokenTypes extends string, GNonTerminalTypes extends string> = {
    [lhs in GNonTerminalTypes]: Array<Array<GTokenTypes | GNonTerminalTypes>>;
};

export interface Grammar<
    GTokens extends readonly Token[],
    GNonTerminals extends readonly string[],
> {
    tokens: GTokens;
    nonTerminals: GNonTerminals;
    nonTerminalProductions: GrammarProductionRules<
        ArrayElementType<GTokens>["type"],
        ArrayElementType<GNonTerminals>
    >;
}
