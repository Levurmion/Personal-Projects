import type { ArrayElementType } from "./utility-types";

export interface Token {
    readonly type: string;
    readonly regex?: RegExp;
    readonly reservedKeyword?: boolean;
    readonly symbol?: boolean;
}

export enum ReservedTokenTypes {
    TERMINATOR = "$",
    EPSILON = "ε",
    DOT = "•",
    AUGMENTED_START = "G'",
}

export interface ProductionRule<
    GTokenTypes extends string = string,
    GNonTerminalTypes extends string = string,
> {
    nonTerminal: GNonTerminalTypes;
    production: (GNonTerminalTypes | GTokenTypes)[];
}

export type GrammarProductionRules<GTokenTypes extends string, GNonTerminalTypes extends string> = {
    [lhs in GNonTerminalTypes]: Array<Array<GTokenTypes | GNonTerminalTypes>>;
};

export interface Grammar<
    GTokens extends Readonly<Token[]>,
    GNonTerminals extends Readonly<string[]>,
    GTokenTypes extends string = ArrayElementType<GTokens>["type"],
    GNonTerminalTypes extends string = ArrayElementType<GNonTerminals>,
> {
    tokens: GTokens;
    nonTerminals: GNonTerminals;
    startSymbol: GNonTerminalTypes;
    nonTerminalProductions: GrammarProductionRules<
        GTokenTypes | ReservedTokenTypes.EPSILON,
        GNonTerminalTypes
    >;
    options?: GrammarOptions;
}

export interface GrammarOptions {
    ignoreWhitespace?: boolean;
    ignoreNewline?: boolean;
}

export interface AugmentedGrammar<
    GTokens extends Readonly<Token[]>,
    GNonTerminals extends Readonly<string[]>,
    GTokenTypes extends string = ArrayElementType<GTokens>["type"],
    GNonTerminalTypes extends string = ArrayElementType<GNonTerminals>,
> extends Grammar<
        GTokens,
        GNonTerminals,
        GTokenTypes,
        GNonTerminalTypes | ReservedTokenTypes.AUGMENTED_START
    > {}

export enum ShiftReduceParserConflict {
    SHIFT_REDUCE = "shift/reduce",
    REDUCE_REDUCE = "reduce/reduce",
}

export type ShiftReduceParserActions =
    | {
          action: "shift";
          symbol: string;
          nextState: number;
      }
    | {
          action: "reduce";
          productionRule: ProductionRule;
      }
    | {
          action: "goto";
          nextState: number;
      }
    | {
          action: "accept";
      }
    | {
          action: "conflict";
          type: ShiftReduceParserConflict;
          possibleActions: ShiftReduceParserActions[];
      }
    | {
          action: "error";
          reason?: string;
      };
