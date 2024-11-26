import { some } from "lodash";
import type { Language } from "../language";
import type { Token } from "../types";
import type { ArrayElementType } from "../utility-types";
import { EPSILON } from "..";

export const getFIRST = <
    GTokens extends readonly Token[],
    GNonTerminals extends readonly string[],
    GNonTerminalTypes extends ArrayElementType<GNonTerminals> = ArrayElementType<GNonTerminals>,
>(
    language: Language<GTokens, GNonTerminals>,
) => {
    const firstSets: Record<string, Set<string>> = {};
    const setsComplete = new Array<boolean>(language.nonTerminalsSet.size).fill(false);

    // initialize empty sets for each non-terminal
    language.nonTerminalsSet.forEach((nonTerminal) => (firstSets[nonTerminal] = new Set<string>()));
    language.terminalsSet.forEach(
        (terminal) => (firstSets[terminal] = new Set<string>([terminal])),
    );

    while (some(setsComplete, (val) => val === false)) {
        let idx = 0;
        for (const nonTerminal of language.nonTerminalsSet) {
            const currFirstSet = firstSets[nonTerminal];
            const productionRules = language.getRulesOfNonTerminal(
                nonTerminal as GNonTerminalTypes,
            );
            let newFirstSet = new Set(currFirstSet);
            for (const rule of productionRules) {
                for (const symbol of rule.production) {
                    if (language.terminalsSet.has(symbol) || symbol === EPSILON) {
                        // symbol is a terminal
                        symbol !== EPSILON && newFirstSet.add(symbol);
                        break;
                    }
                    // symbol is a non-terminal
                    newFirstSet = new Set([...newFirstSet, ...firstSets[symbol]]);
                    if (!language.nonTerminalHasEpsilonProduction(symbol as GNonTerminalTypes)) {
                        break;
                    }
                }
            }

            firstSets[nonTerminal] = newFirstSet;
            setsComplete[idx] = newFirstSet.size === currFirstSet.size;
            idx++;
        }
    }

    return firstSets as Record<string, Set<GNonTerminalTypes>>;
};
