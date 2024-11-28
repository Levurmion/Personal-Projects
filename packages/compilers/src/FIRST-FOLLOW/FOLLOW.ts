import { EPSILON, ReservedTokenTypes, TERMINATOR } from "..";
import type { Language } from "../language/language";
import type { Token } from "../types";
import type { ArrayElementType } from "../utility-types";
import { SetUtilities } from "@repo/shared-utils";

export const getFOLLOW = <
    GTokens extends readonly Token[],
    GNonTerminals extends readonly string[],
    GNonTerminalTypes extends ArrayElementType<GNonTerminals> = ArrayElementType<GNonTerminals>,
>(
    language: Language<GTokens, GNonTerminals>,
    firstSets: Record<string, Set<string>>,
) => {
    const followSets: Record<string, Set<string>> = {};

    // initialize empty sets for each non-terminal, start symbol gets initialized with TERMINATOR
    language.nonTerminalsSet.forEach(
        (nonTerminal) =>
            (followSets[nonTerminal] =
                language.grammar.startSymbol === nonTerminal
                    ? new Set<string>(TERMINATOR)
                    : new Set<string>()),
    );

    let changed = true;
    while (changed) {
        for (const nonTerminal of language.nonTerminalsSet) {
            const currFollowSet = followSets[nonTerminal];
            const productionsProducingNonTerminal = language
                .getRulesProducingSymbol(nonTerminal)
                .filter((production) => production.nonTerminal !== nonTerminal);

            let newFollowSet = new Set(currFollowSet);

            for (const rule of productionsProducingNonTerminal) {
                const productionRule = rule.production;
                const nonTerminalIdx = productionRule.findIndex((symbol) => symbol === nonTerminal);

                if (nonTerminalIdx === productionRule.length - 1) {
                    newFollowSet = SetUtilities.union(newFollowSet, followSets[rule.nonTerminal]);
                    continue;
                }

                const nextSymbolIdx = nonTerminalIdx + 1;
                const nextSymbol = productionRule[nextSymbolIdx];
                const nextSymbolFirstSet = firstSets[nextSymbol];

                // exclude EPSILON from FOLLOW set
                nextSymbolFirstSet.delete(EPSILON);
                newFollowSet = SetUtilities.union(newFollowSet, nextSymbolFirstSet);

                if (
                    language.nonTerminalsSet.has(nextSymbol) &&
                    language.hasEpsilonProduction(nextSymbol as GNonTerminalTypes)
                ) {
                    newFollowSet = SetUtilities.union(newFollowSet, followSets[rule.nonTerminal]);
                }
            }

            followSets[nonTerminal] = newFollowSet;
            changed = newFollowSet.size !== currFollowSet.size;
        }
    }

    return followSets as Record<string, Set<GNonTerminalTypes | ReservedTokenTypes.TERMINATOR>>;
};
