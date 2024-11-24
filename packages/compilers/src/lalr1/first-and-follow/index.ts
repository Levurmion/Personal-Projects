import { Language } from "../language";
import { ReservedTokenTypes, type Token } from "../types";
import type { ArrayElementType } from "../utility-types";
import type { FirstAndFollowSets, NonTerminalSymbolSets } from "./types";
import { every } from "lodash";

export const getFirstAndFollowSets = <
    GTokens extends readonly Token[] = Token[],
    GNonTerminals extends readonly string[] = string[],
    GTokenTypes extends ArrayElementType<GTokens>["type"] = ArrayElementType<GTokens>["type"],
    GNonTerminalTypes extends ArrayElementType<GNonTerminals> = ArrayElementType<GNonTerminals>,
    GSymbols extends GTokenTypes | GNonTerminalTypes = GTokenTypes | GNonTerminalTypes,
>(
    language: Language<GTokens, GNonTerminals>,
): FirstAndFollowSets<GTokenTypes, GNonTerminalTypes> => {
    const FIRST_SETS = {} as NonTerminalSymbolSets<GTokenTypes, GNonTerminalTypes>;

    const FIRST = (nonTerminal: GNonTerminalTypes): Set<GTokenTypes> => {
        let firstSymbolsSet = new Set<GSymbols>();
        const productionRules = language.getRulesOfNonTerminal(nonTerminal);
        productionRules.forEach(
            (productionRule) =>
                productionRule.production[0] !== nonTerminal &&
                firstSymbolsSet.add(productionRule.production[0] as GSymbols),
        );

        // separate out terminals vs non-terminals
        const firstSymbolsArr = Array.from(firstSymbolsSet);
        const nonTerminalSymbols = firstSymbolsArr.filter((symbol) =>
            language.nonTerminalsSet.has(symbol),
        ) as unknown as GNonTerminalTypes[];
        const terminalSymbols = firstSymbolsArr.filter((symbol) =>
            language.terminalsSet.has(symbol),
        ) as unknown as GTokenTypes[];

        // recurse and solve for FIRST() of other non-terminals if necessary
        if (nonTerminal in FIRST_SETS) {
            return FIRST_SETS[nonTerminal];
        } else if (nonTerminalSymbols.length <= 0) {
            return new Set(terminalSymbols);
        } else {
            let result = new Set(terminalSymbols);
            for (const nonTerminal of nonTerminalSymbols) {
                result = new Set([...result, ...FIRST(nonTerminal)]);
            }
            return result;
        }
    };

    const FOLLOW = (nonTerminal: GNonTerminalTypes) => {};

    for (const nonTerminal of language.nonTerminalsSet as Set<GNonTerminalTypes>) {
        FIRST_SETS[nonTerminal] = FIRST(nonTerminal);
    }

    return {
        FIRST: FIRST_SETS,
        FOLLOW: {} as any,
    };
};
