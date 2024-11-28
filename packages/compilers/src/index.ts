import { some } from "lodash";
import { ReservedTokenTypes, type AugmentedGrammar, type Grammar, type Token } from "./types";
import type { ArrayElementType } from "./utility-types";

export const TERMINATOR = ReservedTokenTypes.TERMINATOR;
export const EPSILON = ReservedTokenTypes.EPSILON;
export const DOT = ReservedTokenTypes.DOT;
export const AUGMENTED_START = ReservedTokenTypes.AUGMENTED_START;

const RESERVED_TOKENS_SET = new Set<string>([...Object.values(ReservedTokenTypes)]);

export const createGrammar = <GTokens extends Token[], GNonTerminal extends string[]>(
    grammar: Grammar<GTokens, GNonTerminal>,
) => {
    const grammarSymbols = [...grammar.nonTerminals, ...grammar.tokens.map((token) => token.type)];
    for (const symbol of grammarSymbols) {
        if (RESERVED_TOKENS_SET.has(symbol)) {
            throw new Error(`Cannot use reserved symbol: ${symbol} in grammar.`);
        }
    }

    return grammar;
};

export const augmentGrammar = <
    GTokens extends Token[],
    GNonTerminals extends string[],
    GNonTerminalTypes extends ArrayElementType<GNonTerminals> = ArrayElementType<GNonTerminals>,
>(
    grammar: Grammar<GTokens, GNonTerminals>,
) => {
    return {
        tokens: [...grammar.tokens],
        nonTerminals: [...grammar.nonTerminals, AUGMENTED_START],
        startSymbol: AUGMENTED_START,
        nonTerminalProductions: {
            "G'": [[grammar.startSymbol]],
            ...grammar.nonTerminalProductions,
        },
    } as AugmentedGrammar<GTokens, (GNonTerminalTypes | ReservedTokenTypes.AUGMENTED_START)[]>;
};
