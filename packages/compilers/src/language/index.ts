import type { Grammar, ProductionRule, Token } from "../types";
import type { ArrayElementType } from "../utility-types";
import type { EnumeratedProductionRules } from "./types";

export class Language<
    GTokens extends readonly Token[] = Token[],
    GNonTerminals extends readonly string[] = string[],
    GTokenTypes extends ArrayElementType<GTokens>["type"] = ArrayElementType<GTokens>["type"],
    GNonTerminalTypes extends ArrayElementType<GNonTerminals> = ArrayElementType<GNonTerminals>,
    GSymbols extends GTokenTypes | GNonTerminalTypes = GTokenTypes | GNonTerminalTypes,
> {
    // attributes
    public productionRules: EnumeratedProductionRules;
    public terminalsSet: Set<string>;
    public nonTerminalsSet: Set<string>;
    public grammar: Grammar<GTokens, GNonTerminals>;

    private productionRuleIndex: { [nonTerminal in GNonTerminalTypes]: number[] };
    private productionRuleInvertedIndex: { [gSymbol in GSymbols]: number[] };

    constructor(grammar: Grammar<GTokens, GNonTerminals>) {
        this.grammar = grammar;
        this.productionRules = this.enumerateProductionRules();
        this.productionRuleIndex = this.generateIndex();
        this.productionRuleInvertedIndex = this.generateInvertedIndex();
        this.terminalsSet = new Set(grammar.tokens.map((token) => token.type));
        this.nonTerminalsSet = new Set(grammar.nonTerminals);
    }

    /**
     * ==================== PRIVATE METHODS ====================
     */

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
        const index = Object.fromEntries(
            Array.from(nonTerminalsSet).map((nonTerminal) => [nonTerminal, []]),
        ) as unknown as { [nonTerminal in GNonTerminalTypes]: number[] };

        for (const [productionRuleId, productionRule] of Object.entries(this.productionRules)) {
            const nonTerminal = (productionRule as ProductionRule<GTokenTypes, GNonTerminalTypes>)
                .nonTerminal;
            index[nonTerminal].push(productionRuleId as unknown as number);
        }

        return index;
    };

    private generateInvertedIndex = () => {
        const { nonTerminals, tokens } = this.grammar;
        const symbolsSet = new Set([...nonTerminals, ...tokens.map((token) => token.type)]);
        const invertedIndex = Object.fromEntries(
            Array.from(symbolsSet).map((symbol) => [symbol, []]),
        ) as unknown as { [gSymbol in GSymbols]: number[] };

        for (const [productionRuleId, productionRule] of Object.entries(this.productionRules)) {
            for (const symbol of productionRule.production as GSymbols[]) {
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
        symbol: GSymbols,
    ): ProductionRule<GTokenTypes, GNonTerminalTypes>[] => {
        const productionRuleIds = this.productionRuleInvertedIndex[symbol];
        return productionRuleIds.map((id) => this.productionRules[id]);
    };

    /**
     * Retrieve all `ProductionRule` associated with a `nonTerminal`.
     * @param nonTerminal Any non-terminal specified in the `Grammar` of the `Language`
     * @returns
     */
    public getRulesOfNonTerminal = (
        nonTerminal: GNonTerminalTypes,
    ): ProductionRule<GTokenTypes, GNonTerminalTypes>[] => {
        const productionRuleIds = this.productionRuleIndex[nonTerminal];
        return productionRuleIds.map((id) => this.productionRules[id]);
    };
}
