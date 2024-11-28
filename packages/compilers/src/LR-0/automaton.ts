import { AUGMENTED_START, DOT, EPSILON } from "..";
import type { Language } from "../language";
import type { ProductionRule, ReservedTokenTypes, Token } from "../types";
import type { ArrayElementType } from "../utility-types";
import { LR0ClosureSet } from "./closure-set";
import { LR0Item } from "./item";

export class LR0Automaton<
    GTokens extends readonly Token[] = Token[],
    GNonTerminals extends readonly string[] = string[],
    GTokenTypes extends ArrayElementType<GTokens>["type"] | ReservedTokenTypes.EPSILON =
        | ArrayElementType<GTokens>["type"]
        | ReservedTokenTypes.EPSILON,
    GNonTerminalTypes extends ArrayElementType<GNonTerminals> = ArrayElementType<GNonTerminals>,
    GSymbols extends GTokenTypes | GNonTerminalTypes = GTokenTypes | GNonTerminalTypes,
> {
    public readonly language: Language<GTokens, GNonTerminals>;

    private DFAStates: Record<number, LR0ClosureSet>;
    private DFAStatesIndex: Record<string, number>;

    constructor(language: Language<GTokens, GNonTerminals>) {
        // ensure that this is an augmented language
        if (language.grammar.startSymbol !== AUGMENTED_START) {
            throw new Error(`Cannot construct an LR0ItemSet without an augmented grammar.`);
        }

        this.language = language;
        this.DFAStates = {};
        this.DFAStatesIndex = {};
    }

    public CLOSURE(item: LR0Item): LR0ClosureSet {
        const closureSet = new LR0ClosureSet();

        const queue = [item];
        while (queue.length > 0) {
            // proccess the currItem
            const currItem = queue.pop() as LR0Item;
            closureSet.add(currItem);

            // try to add more items to the queue
            const adjSymbol = currItem.getAdjacentSymbol();
            if (
                adjSymbol === null ||
                adjSymbol === EPSILON ||
                this.language.terminalsSet.has(adjSymbol)
            ) {
                continue;
            } else {
                // if •A -> x•By, recursively apply •B -> •z
                const adjNonTerminalProductions = this.language.getRulesOfNonTerminal(
                    adjSymbol as GNonTerminalTypes,
                );
                const nextItems = adjNonTerminalProductions.map(
                    (productionRule) => new LR0Item(productionRule),
                );
                for (const nextItem of nextItems) {
                    if (!closureSet.has(nextItem)) {
                        queue.unshift(nextItem);
                    }
                }
            }
        }

        return closureSet;
    }

    public GOTO(closureSet: LR0ClosureSet, symbol: GSymbols): LR0ClosureSet | null {
        let gotoSet = new LR0ClosureSet();
        for (const item of closureSet) {
            if (item.getAdjacentSymbol() === symbol) {
                const gotoItem = item.shiftDotRight();
                if (gotoItem) {
                    gotoSet.add(gotoItem);
                }
            }
        }
        if (gotoSet.size() === 0) {
            return null;
        } else {
            for (const item of gotoSet) {
                gotoSet = gotoSet.union(this.CLOSURE(item));
            }
            return gotoSet;
        }
    }

    private indexState(stateId: number) {
        const state = this.DFAStates[stateId];
        if (state === undefined) return;
        for (const item of state) {
            this.DFAStatesIndex[item.getName()] = stateId;
        }
    }

    private getStateWithItem(item: LR0Item) {
        return this.DFAStatesIndex[item.getName()];
    }

    public buildDFA() {
        const startItem = new LR0Item(
            this.language.getRulesOfNonTerminal(AUGMENTED_START as GNonTerminalTypes)[0],
        );
        this.DFAStates[0] = this.CLOSURE(startItem);
        this.indexState(0);

        const queue = [[0, this.DFAStates[0].gotoSymbols()]];
        while (queue.length > 0) {}
    }
}
