import type { Grammar, Token } from "../types";
import type { EnumeratedProductionRules } from "./types";

export class Language<GTokens extends readonly Token[], GNonTerminals extends readonly string[]> {
    public productionRules: EnumeratedProductionRules;

    private grammar: Grammar<GTokens, GNonTerminals>;
    private productionRuleInvertedIndex: { [symbol: string]: number[] };

    constructor(grammar: Grammar<GTokens, GNonTerminals>) {
        this.grammar = grammar;
        this.productionRules = this.enumerateProductionRules();
        this.productionRuleInvertedIndex = this.generateInvertedIndex();
    }

    private enumerateProductionRules = (): EnumeratedProductionRules => {
        const { nonTerminalProductions } = this.grammar;

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

    private generateInvertedIndex = () => {
        const { nonTerminals, tokens } = this.grammar;
        const symbolsSet = new Set([...nonTerminals, ...tokens.map((token) => token.type)]);
        const invertedIndex: { [symbol: string]: number[] } = Object.fromEntries(
            Array.from(symbolsSet).map((symbol) => [symbol, []]),
        );

        for (const [productionRuleId, productionRule] of Object.entries(this.productionRules)) {
            for (const symbol of productionRule.productionRule as string[]) {
                invertedIndex[symbol].push(productionRuleId as unknown as number);
            }
        }

        return invertedIndex;
    };
}
