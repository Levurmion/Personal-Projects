import { SetUtilities } from "@repo/shared-utils";
import type { Language } from "../language/language";
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

    // initialize empty sets for non-terminals
    language.nonTerminalsSet.forEach((nonTerminal) => (firstSets[nonTerminal] = new Set<string>()));
    language.terminalsSet.forEach(
        (terminal) => (firstSets[terminal] = new Set<string>([terminal])),
    );

    let unchanged = true;
    while (unchanged) {
        unchanged = false;
        for (const nonTerminal of language.nonTerminalsSet) {
            const currFirstSet = firstSets[nonTerminal];
            const productionRules = language.getRulesOfNonTerminal(
                nonTerminal as GNonTerminalTypes,
            );
            let newFirstSet = new Set(currFirstSet);

            // for each production rule of the non-terminal
            for (const rule of productionRules) {
                for (const symbol of rule.production) {
                    if (symbol === EPSILON) {
                        newFirstSet.add(EPSILON);
                        break;
                    } else if (language.terminalsSet.has(symbol)) {
                        newFirstSet.add(symbol);
                        break;
                    } else {
                        // symbol is a non-terminal
                        newFirstSet = SetUtilities.union([newFirstSet, firstSets[symbol]]);
                    }

                    if (!language.hasEpsilonProduction(symbol as GNonTerminalTypes)) {
                        break;
                    }
                }
            }

            firstSets[nonTerminal] = newFirstSet;
            unchanged = unchanged || newFirstSet.size !== currFirstSet.size;
        }
    }

    return firstSets as Record<string, Set<GNonTerminalTypes>>;
};
