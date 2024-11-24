import type { Grammar, ProductionRule, Token } from "../types";
import type { ArrayElementType } from "../utility-types";
import type { EnumeratedProductionRules } from "./types";

export class Language<
    GTokens extends readonly Token[],
    GNonTerminals extends readonly string[],
    GTokenTypes extends string = ArrayElementType<GTokens>["type"],
    GNonTerminalTypes extends string = ArrayElementType<GNonTerminals>,
> {
    // attributes
    public productionRules: EnumeratedProductionRules;
    public terminalsSet: Set<string>;
    public nonTerminalsSet: Set<string>;
    public grammar: Grammar<GTokens, GNonTerminals>;

    private productionRuleIndex: { [nonTerminal: string]: number[] };
    private productionRuleInvertedIndex: { [symbol: string]: number[] };

    constructor(grammar: Grammar<GTokens, GNonTerminals>) {
        this.grammar = grammar;
        this.productionRules = this.enumerateProductionRules();
        this.productionRuleIndex = this.generateIndex();
        this.productionRuleInvertedIndex = this.generateInvertedIndex();
        this.terminalsSet = new Set(grammar.tokens.map((token) => token.type));
        this.nonTerminalsSet = new Set(grammar.nonTerminals);
    }

    private enumerateProductionRules = (): EnumeratedProductionRules => {
        const { nonTerminalProductions } = this.grammar;

        let id = 0;
        const enumeratedProductionRules = {} as EnumeratedProductionRules;

        for (const [nonTerminal, productionRules] of Object.entries(nonTerminalProductions)) {
            for (const productionRule of productionRules as string[][]) {
                enumeratedProductionRules[id] = {
                    nonTerminal,
                    production: productionRule,
                };
                id++;
            }
        }

        return enumeratedProductionRules;
    };

    private generateIndex = () => {
        const { nonTerminals } = this.grammar;
        const nonTerminalsSet = new Set(nonTerminals);
        const index: { [nonTerminal: string]: number[] } = Object.fromEntries(
            Array.from(nonTerminalsSet).map((nonTerminal) => [nonTerminal, []]),
        );

        for (const [productionRuleId, productionRule] of Object.entries(this.productionRules)) {
            const nonTerminal = (productionRule as ProductionRule).nonTerminal;
            index[nonTerminal].push(productionRuleId as unknown as number);
        }

        return index;
    };

    private generateInvertedIndex = () => {
        const { nonTerminals, tokens } = this.grammar;
        const symbolsSet = new Set([...nonTerminals, ...tokens.map((token) => token.type)]);
        const invertedIndex: { [symbol: string]: number[] } = Object.fromEntries(
            Array.from(symbolsSet).map((symbol) => [symbol, []]),
        );

        for (const [productionRuleId, productionRule] of Object.entries(this.productionRules)) {
            for (const symbol of productionRule.production as string[]) {
                invertedIndex[symbol].push(productionRuleId as unknown as number);
            }
        }

        return invertedIndex;
    };

    /**
     * ==================== PUBLIC METHODS ====================
     */

    /**
     * Retrieve all `ProductionRule` that produces `symbol`.
     * @param symbol Any terminal/non-terminal specified in the `Grammar` of the `Language`
     */
    public getRulesProducingSymbol = (
        symbol: GTokenTypes | GNonTerminalTypes,
    ): ProductionRule[] => {
        const productionRuleIds = this.productionRuleInvertedIndex[symbol];
        return productionRuleIds.map((id) => this.productionRules[id]);
    };

    public getRulesOfNonTerminal = (nonTerminal: GNonTerminalTypes): ProductionRule[] => {
        const productionRuleIds = this.productionRuleIndex[nonTerminal];
        return productionRuleIds.map((id) => this.productionRules[id]);
    };
}
