import type { ArrayElementType } from "./utility-types";

export enum ReservedTokenTypes {
    TERMINATOR = "$",
    EPSILON = "ε",
}

export interface Token {
    readonly type: string;
    readonly regex: RegExp;
}

export interface ProductionRule {
    nonTerminal: string;
    production: string[];
}

export type GrammarProductionRules<GTokenTypes extends string, GNonTerminalTypes extends string> = {
    [lhs in GNonTerminalTypes]: Array<Array<GTokenTypes | GNonTerminalTypes>>;
};

export interface Grammar<
    GTokens extends readonly Token[],
    GNonTerminals extends readonly string[],
    GTokenTypes extends string = ArrayElementType<GTokens>["type"],
    GNonTerminalTypes extends string = ArrayElementType<GNonTerminals>,
> {
    tokens: GTokens;
    nonTerminals: GNonTerminals;
    nonTerminalProductions: GrammarProductionRules<GTokenTypes, GNonTerminalTypes>;
}
