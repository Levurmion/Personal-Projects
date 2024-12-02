import { augmentGrammar, EPSILON } from "..";
import { Automaton } from "../automaton";
import { Language } from "../language";
import type { LexerToken } from "../lexer";
import type { ParsingTable, ParsingTableConstructor } from "../parsing-tables/types";
import type {
    AugmentedGrammar,
    Grammar,
    ReservedTokenTypes,
    ShiftReduceParserActions,
    Token,
} from "../types";
import type { ArrayElementType } from "../utility-types";
import type { ParsedSymbol, ParseTreeNode } from "./types";

export class ShiftReduceParser<
    GTokens extends Token[] = Token[],
    GNonTerminals extends string[] = string[],
    GTokenTypes extends
        | ArrayElementType<GTokens>["type"]
        | ReservedTokenTypes.EPSILON
        | ReservedTokenTypes.TERMINATOR =
        | ArrayElementType<GTokens>["type"]
        | ReservedTokenTypes.EPSILON
        | ReservedTokenTypes.TERMINATOR,
    GNonTerminalTypes extends ArrayElementType<GNonTerminals> = ArrayElementType<GNonTerminals>,
    AugmentedNonTerminalsTypes extends GNonTerminalTypes | ReservedTokenTypes.AUGMENTED_START =
        | GNonTerminalTypes
        | ReservedTokenTypes.AUGMENTED_START,
    GSymbols extends GTokenTypes | GNonTerminalTypes = GTokenTypes | GNonTerminalTypes,
> {
    private readonly augmentedLanguage: Language<GTokens, AugmentedNonTerminalsTypes[]>;
    private readonly automaton: Automaton<GTokens, AugmentedNonTerminalsTypes[]>;
    private readonly parsingTable: ParsingTable<GTokens, AugmentedNonTerminalsTypes[]>;
    private stateStack: number[] = [];
    private symbolsStack: ParsedSymbol[] = [];
    private parseTreeNodeStack: ParseTreeNode[] = [];

    public parseTree: ParseTreeNode | null = null;

    constructor(
        augmentedGrammar: AugmentedGrammar<GTokens, AugmentedNonTerminalsTypes[]>,
        strategy: ParsingTableConstructor,
    ) {
        this.augmentedLanguage = new Language(augmentedGrammar);
        this.automaton = new Automaton(this.augmentedLanguage);
        this.parsingTable = new strategy(this.automaton);
        this.stateStack = [];
        this.symbolsStack = [];
    }

    public parseTokens(tokenStream: LexerToken<GSymbols>[]): boolean {
        this.stateStack = [0];

        while (tokenStream.length > 0) {
            const currToken = tokenStream[0];
            const currState = this.stateStack[this.stateStack.length - 1];
            const latestSymbol = this.symbolsStack[this.symbolsStack.length - 1];

            let parserAction: ShiftReduceParserActions | null = null;
            if (
                latestSymbol &&
                this.augmentedLanguage.nonTerminalsSet.has(
                    latestSymbol.type as AugmentedNonTerminalsTypes,
                )
            ) {
                parserAction = this.parsingTable.ACTION_GOTO(currState, latestSymbol.type);
            }
            if (!parserAction || parserAction.action === "error") {
                parserAction = this.parsingTable.ACTION_GOTO(currState, currToken.type);
            }
            if (parserAction.action === "error") {
                return false;
            }

            switch (parserAction.action) {
                case "shift": {
                    tokenStream.shift();
                    this.symbolsStack.push({
                        type: currToken.type,
                        value: currToken.value,
                    });
                    this.parseTreeNodeStack.push({
                        type: currToken.type,
                        value: currToken.value,
                    });
                    this.stateStack.push(parserAction.nextState);
                    continue;
                }
                case "reduce": {
                    const { nonTerminal, production } = parserAction.productionRule;
                    const nonTerminalParseTreeNode: ParseTreeNode = {
                        type: nonTerminal,
                        value: nonTerminal,
                        children: [],
                    };

                    for (let i = 0; i < production.length; i++) {
                        const symbol = production[i];
                        if (symbol !== EPSILON) {
                            this.stateStack.pop();
                        }
                        this.symbolsStack.pop();
                        const topParseTreeNode = this.parseTreeNodeStack.pop();
                        if (topParseTreeNode) {
                            nonTerminalParseTreeNode.children?.unshift(topParseTreeNode);
                        }
                    }
                    this.symbolsStack.push({
                        type: nonTerminal,
                        value: nonTerminal,
                    });
                    this.parseTreeNodeStack.push(nonTerminalParseTreeNode);
                    continue;
                }
                case "goto": {
                    this.stateStack.push(parserAction.nextState);
                    continue;
                }
                case "accept": {
                    this.parseTree = this.parseTreeNodeStack[0];
                    return true;
                }
                case "conflict": {
                    return false;
                }
                default: {
                    return false;
                }
            }
        }

        return true;
    }
}
