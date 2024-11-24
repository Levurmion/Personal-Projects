import type { Grammar, Token } from "../types";

export interface ProductionRule {
    nonTerminal: string;
    productionRule: string[];
}

export interface EnumeratedProductionRules {
    [id: number]: ProductionRule;
}

export const enumerateProductionRules = <
    GTokens extends readonly Token[],
    GNonTerminals extends readonly string[],
>(
    grammar: Grammar<GTokens, GNonTerminals>,
): EnumeratedProductionRules => {
    const { nonTerminalProductions } = grammar;

    let id = 0;
    const enumeratedProductionRules = {} as EnumeratedProductionRules;

    for (const [nonTerminal, productionRules] of Object.entries(nonTerminalProductions)) {
        for (const productionRule of productionRules as string[][]) {
            enumeratedProductionRules[id] = {
                nonTerminal,
                productionRule,
            };
            id++;
        }
    }

    return enumeratedProductionRules;
};
