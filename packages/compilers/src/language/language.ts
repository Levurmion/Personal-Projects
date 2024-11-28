import { some } from "lodash";
import type {
    AugmentedGrammar,
    Grammar,
    ProductionRule,
    ReservedTokenTypes,
    Token,
} from "../types";
import type { ArrayElementType } from "../utility-types";
import type { EnumeratedProductionRules } from "./types";
import { EPSILON } from "..";

export class Language<
    GTokens extends readonly Token[] = Token[],
    GNonTerminals extends readonly string[] = string[],
    GTokenTypes extends ArrayElementType<GTokens>["type"] | ReservedTokenTypes.EPSILON =
        | ArrayElementType<GTokens>["type"]
        | ReservedTokenTypes.EPSILON,
    GNonTerminalTypes extends ArrayElementType<GNonTerminals> = ArrayElementType<GNonTerminals>,
    GSymbols extends GTokenTypes | GNonTerminalTypes = GTokenTypes | GNonTerminalTypes,
> {
    // attributes
    public readonly productionRules: EnumeratedProductionRules<GTokenTypes, GNonTerminalTypes>;
    public readonly terminalsSet: Set<string>;
    public readonly nonTerminalsSet: Set<string>;
    public readonly grammar:
        | Grammar<GTokens, GNonTerminals>
        | AugmentedGrammar<GTokens, GNonTerminals>;

    private productionRuleIndex: { [nonTerminal in GNonTerminalTypes]: number[] };
    private productionRuleInvertedIndex: { [gSymbol in GSymbols]: number[] };

    constructor(
        grammar: Grammar<GTokens, GNonTerminals> | AugmentedGrammar<GTokens, GNonTerminals>,
    ) {
        this.grammar = grammar;
        this.productionRules = this.enumerateProductionRules();
        this.productionRuleIndex = this.generateIndex();
        this.productionRuleInvertedIndex = this.generateInvertedIndex();
        this.terminalsSet = new Set(grammar.tokens.map((token) => token.type as GTokenTypes));
        this.nonTerminalsSet = new Set(grammar.nonTerminals) as Set<GNonTerminalTypes>;
    }

    /**
     * ==================== PRIVATE METHODS ====================
     */

    private enumerateProductionRules = (): EnumeratedProductionRules<
        GTokenTypes,
        GNonTerminalTypes
    > => {
        const { nonTerminalProductions } = this.grammar;

        let id = 0;
        const enumeratedProductionRules = {} as EnumeratedProductionRules<
            GTokenTypes,
            GNonTerminalTypes
        >;

        for (const [nonTerminal, productionRules] of Object.entries(nonTerminalProductions)) {
            for (const productionRule of productionRules as string[][]) {
                enumeratedProductionRules[id] = {
                    nonTerminal: nonTerminal as GNonTerminalTypes,
                    production: productionRule as GSymbols[],
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
            index[nonTerminal]?.push(productionRuleId as unknown as number);
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
                invertedIndex[symbol]?.push(productionRuleId as unknown as number);
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
     */
    public getRulesOfNonTerminal = (
        nonTerminal: GNonTerminalTypes,
    ): ProductionRule<GTokenTypes, GNonTerminalTypes>[] => {
        if (!this.nonTerminalsSet.has(nonTerminal)) {
            throw new Error(`Symbol: ${nonTerminal} is not a non-terminal.`);
        }
        const productionRuleIds = this.productionRuleIndex[nonTerminal];
        return productionRuleIds.map((id) => this.productionRules[id]);
    };

    /**
     * Check if a non-terminal as an `EPSILON` production rule.
     * @param nonTerminal Any non-terminal specified in the `Grammar` of the `Language`
     */
    public hasEpsilonProduction = (nonTerminal: GNonTerminalTypes): boolean => {
        const nonTerminalProductionRules = this.getRulesOfNonTerminal(nonTerminal);
        return some(
            nonTerminalProductionRules,
            (rule: ProductionRule<GTokenTypes, GNonTerminalTypes>) =>
                rule.production.find((val) => val === EPSILON),
        );
    };
}
