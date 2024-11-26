import { some } from "lodash";
import { ReservedTokenTypes, TERMINATOR } from "..";
import type { Language } from "../language";
import type { Token } from "../types";
import type { ArrayElementType } from "../utility-types";

export const getFOLLOW = <
    GTokens extends readonly Token[],
    GNonTerminals extends readonly string[],
    GNonTerminalTypes extends ArrayElementType<GNonTerminals> = ArrayElementType<GNonTerminals>,
>(
    language: Language<GTokens, GNonTerminals>,
    firstSets: Record<string, Set<string>>,
) => {
    const followSets: Record<string, Set<string>> = {};
    const setsComplete = new Array<boolean>(language.nonTerminalsSet.size).fill(false);

    // initialize empty sets for each non-terminal
    language.nonTerminalsSet.forEach(
        (nonTerminal) =>
            (followSets[nonTerminal] =
                language.grammar.startSymbol === nonTerminal
                    ? new Set<string>(TERMINATOR)
                    : new Set<string>()),
    );

    while (some(setsComplete, (val) => val === false)) {
        let idx = 0;
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
                    newFollowSet = new Set([...newFollowSet, ...followSets[rule.nonTerminal]]);
                    continue;
                }

                const nextSymbolIdx = nonTerminalIdx + 1;
                const nextSymbol = productionRule[nextSymbolIdx];
                newFollowSet = new Set([...newFollowSet, ...firstSets[nextSymbol]]);

                if (
                    language.nonTerminalsSet.has(nextSymbol) &&
                    language.nonTerminalHasEpsilonProduction(nextSymbol as GNonTerminalTypes)
                ) {
                    newFollowSet = new Set([...newFollowSet, ...followSets[rule.nonTerminal]]);
                }
            }

            followSets[nonTerminal] = newFollowSet;
            setsComplete[idx] = newFollowSet.size === currFollowSet.size;
            idx++;
        }
    }

    return followSets as Record<string, Set<GNonTerminalTypes | ReservedTokenTypes.TERMINATOR>>;
};
