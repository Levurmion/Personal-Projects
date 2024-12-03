import type { ArrayElementType } from "../utility-types";

export enum ReservedGrammarTerminalTypes {
    TERMINATOR = "$",
    EPSILON = "ε",
}

export type SemanticActions = "collect" | "push";

export type NonTerminal = string;
export interface Terminal {
    type: string;
    regex: RegExp;
}

export interface GrammarTerminals<GTerminals extends Terminal[]> {
    symbols?: GTerminals;
    keywords?: GTerminals;
    generics?: GTerminals;
}

export interface GrammarProductionRule<
    GTerminalTypes extends string,
    GNonTerminalTypes extends string,
> {
    rule: (GTerminalTypes | GNonTerminalTypes | ReservedGrammarTerminalTypes.EPSILON)[];
    action?: SemanticActions;
}

export type GrammarProductionRules<
    GTerminals extends Terminal[],
    GNonTerminals extends NonTerminal[],
    GTerminalTypes extends
        ArrayElementType<GTerminals>["type"] = ArrayElementType<GTerminals>["type"],
    GNonTerminalTypes extends ArrayElementType<GNonTerminals> = ArrayElementType<GNonTerminals>,
> = {
    [nonTerminal in GNonTerminalTypes]: GrammarProductionRule<GTerminalTypes, GNonTerminalTypes>[];
};

export interface GrammarConfig<
    GTerminals extends Terminal[] = Terminal[],
    GNonTerminals extends NonTerminal[] = NonTerminal[],
> {
    terminals: GrammarTerminals<GTerminals>;
    nonTerminals: GNonTerminals;
    startSymbol: ArrayElementType<GNonTerminals>;
    productionRules: GrammarProductionRules<GTerminals, GNonTerminals>;
}
