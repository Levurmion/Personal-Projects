import { ReservedTokenTypes, type Grammar, type Token } from "../types";
import type { ArrayElementType } from "../utility-types";
import type { FirstAndFollowSet } from "./types";

export const getFirstAndFollow = <
    GTokens extends readonly Token[],
    GNonTerminals extends readonly string[],
>(
    grammar: Grammar<GTokens, GNonTerminals>,
): FirstAndFollowSet<ArrayElementType<GTokens>["type"], ArrayElementType<GNonTerminals>> => {
    const { tokens, nonTerminals, productionRules } = grammar;
    const terminalsSet = new Set(tokens.map((token) => token.type));
    const nonTerminalsSet = new Set(nonTerminals);

    // add terminator to terminalsSet
    terminalsSet.add(ReservedTokenTypes.TERMINATOR);

    return { first: {}, follow: {} };
};
