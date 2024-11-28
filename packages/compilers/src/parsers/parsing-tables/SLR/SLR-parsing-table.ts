import { AUGMENTED_START, TERMINATOR } from "../..";
import { getFIRSTandFOLLOW } from "../../FIRST-FOLLOW";
import type { Automaton, Item } from "../../automaton";
import type { ShiftReduceParserActions, Token } from "../../types";
import type { ArrayElementType } from "../../utility-types";
import type { ParsingTable } from "../types";

export class SLRParsingTable<
    GTokens extends Token[] = Token[],
    GNonTerminals extends string[] = string[],
    GTokenTypes extends ArrayElementType<GTokens>["type"] = ArrayElementType<GTokens>["type"],
    GNonTerminalTypes extends ArrayElementType<GNonTerminals> = ArrayElementType<GNonTerminals>,
    GSymbols extends GTokenTypes | GNonTerminalTypes = GTokenTypes | GNonTerminalTypes,
> implements ParsingTable<GTokens, GNonTerminals, GTokenTypes, GNonTerminalTypes, GSymbols>
{
    private readonly automaton: Automaton<GTokens, GNonTerminals>;
    private readonly followSets: Record<string, Set<GSymbols>>;
    private readonly SLRTable: Record<number, Record<GSymbols, ShiftReduceParserActions>>;

    constructor(automaton: Automaton<GTokens, GNonTerminals>) {
        this.automaton = automaton;

        const { FOLLOW } = getFIRSTandFOLLOW(this.automaton.language);
        this.followSets = FOLLOW as Record<string, Set<GSymbols>>;
        this.SLRTable = this.constructSLRTable();
    }

    private constructSLRTable(): Record<number, Record<GSymbols, ShiftReduceParserActions>> {
        const languageTerminals = this.automaton.language.terminalsSet;
        const languageNonTerminals = this.automaton.language.nonTerminalsSet;
        const parsingTable: Record<number, Record<GSymbols, ShiftReduceParserActions>> = {};

        for (const [stateId, state] of this.automaton.DFAStates) {
            parsingTable[stateId] = {} as Record<GSymbols, ShiftReduceParserActions>;
            const completedItems = state.items.getCompletedItems();
            const completedNonTerminals = completedItems.reduce(
                (prev, next) => {
                    prev[next.nonTerminal] = next;
                    return prev;
                },
                {} as Record<string, Item>,
            );

            for (const symbol of this.automaton.language.symbolsSet as Set<GSymbols>) {
                const { nextStates, items } = state;

                if (languageTerminals.has(symbol)) {
                    // terminal symbols

                    // check if symbol is a valid lookahead token from the FOLLOW set
                    if (Object.keys(completedNonTerminals).length > 0) {
                        for (const [nonTerminal, item] of Object.entries(completedNonTerminals)) {
                            const FOLLOW = this.followSets[nonTerminal];
                            if (FOLLOW.has(symbol)) {
                                if (symbol === TERMINATOR && nonTerminal === AUGMENTED_START) {
                                    parsingTable[stateId][symbol] = {
                                        action: "accept",
                                    };
                                } else {
                                    parsingTable[stateId][symbol] = {
                                        action: "reduce",
                                        productionRule: {
                                            nonTerminal,
                                            production: item.originalProduction,
                                        },
                                    };
                                }
                            }
                        }
                    }

                    if (symbol in state.nextStates) {
                        parsingTable[stateId][symbol] = {
                            action: "shift",
                            nextState: nextStates[symbol],
                            symbol,
                        };
                    }
                } else if (languageNonTerminals.has(symbol as GNonTerminalTypes)) {
                    // non-terminal symbols
                    if (symbol in state.nextStates) {
                        parsingTable[stateId][symbol] = {
                            action: "goto",
                            nextState: nextStates[symbol],
                        };
                    }
                }
            }
        }

        console.log(parsingTable);

        return parsingTable;
    }

    public ACTION_GOTO(state: number, symbol: GSymbols): ShiftReduceParserActions {
        if (this.SLRTable[state]?.[symbol] !== undefined) {
            return this.SLRTable[state][symbol];
        } else {
            return {
                action: "error",
            };
        }
    }
}
