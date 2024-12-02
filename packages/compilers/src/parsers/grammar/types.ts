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

export interface GrammarTerminals<GTerminals extends Terminal> {
    symbols: GTerminals[];
    keywords: GTerminals[];
    generic: GTerminals[];
}

export interface GrammarProductionRule<
    GTerminals extends Terminal,
    GNonTerminals extends NonTerminal,
> {
    rule: (GTerminals["type"] | GNonTerminals)[];
    action?: SemanticActions;
}

export type GrammarProductionRules<
    GTerminals extends Terminal,
    GNonTerminals extends NonTerminal,
> = {
    [nonTerminal in GNonTerminals]: GrammarProductionRule<GTerminals, GNonTerminals>[];
};

export interface GrammarConfig<
    GTerminals extends Terminal = Terminal,
    GNonTerminals extends NonTerminal = NonTerminal,
> {
    terminals: GrammarTerminals<GTerminals>;
    nonTerminals: GNonTerminals[];
    startSymbol: GNonTerminals;
    productionRules: GrammarProductionRules<GTerminals, GNonTerminals>;
}
