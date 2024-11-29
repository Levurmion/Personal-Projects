import { AUGMENTED_START, EPSILON } from "..";
import type { Language } from "../language";
import type { ReservedTokenTypes, ShiftReduceParserActions, Token } from "../types";
import type { ArrayElementType } from "../utility-types";
import { ClosureSet } from "./closure-set";
import { Item } from "./item";
import type { GotoSet, DFAState } from "./types";

export class Automaton<
    GTokens extends readonly Token[] = Token[],
    GNonTerminals extends readonly string[] = string[],
    GTokenTypes extends
        | ArrayElementType<GTokens>["type"]
        | ReservedTokenTypes.EPSILON
        | ReservedTokenTypes.TERMINATOR =
        | ArrayElementType<GTokens>["type"]
        | ReservedTokenTypes.EPSILON
        | ReservedTokenTypes.TERMINATOR,
    GNonTerminalTypes extends ArrayElementType<GNonTerminals> = ArrayElementType<GNonTerminals>,
    GSymbols extends GTokenTypes | GNonTerminalTypes = GTokenTypes | GNonTerminalTypes,
> {
    public readonly language: Language<
        GTokens,
        GNonTerminals,
        GTokenTypes,
        GNonTerminalTypes,
        GSymbols
    >;
    public readonly DFAStates: Map<number, DFAState>;
    private coreItemsIndex: Map<string, number>;

    constructor(
        language: Language<GTokens, GNonTerminals, GTokenTypes, GNonTerminalTypes, GSymbols>,
    ) {
        // ensure that this is an augmented language
        if (language.grammar.startSymbol !== AUGMENTED_START) {
            throw new Error(`Cannot construct an ItemSet without an augmented grammar.`);
        }

        this.language = language;
        this.DFAStates = new Map();
        this.coreItemsIndex = new Map();

        this.buildDFA();
    }

    public CLOSURE(item: Item): ClosureSet {
        const closureSet = new ClosureSet();

        const queue = [item];
        while (queue.length > 0) {
            // proccess the currItem
            const currItem = queue.pop() as Item;
            closureSet.add(currItem);

            // try to add more items to the queue
            const adjSymbol = currItem.getAdjacentSymbol();
            if (
                adjSymbol === null ||
                adjSymbol === EPSILON ||
                this.language.terminalsSet.has(adjSymbol as GTokenTypes)
            ) {
                continue;
            } else {
                // if •A -> x•By, recursively apply •B -> •z
                const adjNonTerminalProductions = this.language.getRulesOfNonTerminal(
                    adjSymbol as GNonTerminalTypes,
                );
                const nextItems = adjNonTerminalProductions.map(
                    (productionRule) => new Item(productionRule),
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

    public GOTO(stateId: number, symbol: string): GotoSet | null {
        let items = new ClosureSet();
        const coreItems = new ClosureSet();
        const stateItems = this.DFAStates.get(stateId)?.items;
        if (stateItems !== undefined) {
            for (const item of stateItems) {
                if (item.getAdjacentSymbol() === symbol) {
                    const gotoItem = item.shiftDotRight();
                    if (gotoItem) {
                        coreItems.add(gotoItem);
                    }
                }
            }
        }
        if (coreItems.size() === 0) {
            return null;
        } else {
            for (const item of coreItems) {
                items = items.union(this.CLOSURE(item));
            }
            return {
                coreItems,
                items,
            };
        }
    }

    /**
     * Create an index for an existing state using the `coreItems's` hash
     * as the inverted index.
     */
    private indexState(stateId: number) {
        const state = this.DFAStates.get(stateId);
        if (state) {
            const { coreItems } = state;
            const coreItemsSignature = coreItems.getSignature();
            this.coreItemsIndex.set(coreItemsSignature, stateId);
        }
    }

    /**
     * Retrieve the `id` of a state with an identical `coreItem`.
     */
    private getStateIdWithCoreItems(coreItems: ClosureSet): number | null {
        const coreItemsSignature = coreItems.getSignature();
        const stateId = this.coreItemsIndex.get(coreItemsSignature);
        if (stateId !== undefined) {
            return stateId;
        } else {
            return null;
        }
    }

    private buildDFA() {
        const startItem = new Item(
            this.language.getRulesOfNonTerminal(AUGMENTED_START as GNonTerminalTypes)[0],
        );
        this.DFAStates.set(0, {
            coreItems: new ClosureSet([startItem]),
            items: this.CLOSURE(startItem),
            nextStates: {},
        });
        this.indexState(0);

        let nextStateId = 1;
        const queue: [number, DFAState][] = [[0, this.DFAStates.get(0) as DFAState]];
        while (queue.length > 0) {
            const [stateId, state] = queue.pop() as [number, DFAState];
            const gotoSymbols = state.items.gotoSymbols() as Set<GSymbols>;

            for (const symbol of gotoSymbols) {
                const gotoSet = this.GOTO(stateId, symbol);
                if (gotoSet === null) continue;
                const { coreItems, items } = gotoSet;

                const existingStateId = this.getStateIdWithCoreItems(coreItems);
                if (existingStateId !== null) {
                    /**
                     * There exists a state with the same `coreItems` - point the transition on
                     * `symbol` from the current `state` to `existingStateId`.
                     */
                    state.nextStates[symbol] = existingStateId;
                } else {
                    /**
                     * No exisiting states have an identical set of `coreItems`. Create a new state
                     * and point the transition of current `state` on `symbol` to the new state.
                     */
                    state.nextStates[symbol] = nextStateId;
                    const nextState: DFAState = {
                        coreItems,
                        items,
                        nextStates: {},
                    };
                    this.DFAStates.set(nextStateId, nextState);
                    queue.unshift([nextStateId, nextState]);
                    this.indexState(nextStateId);
                    nextStateId++;
                }
            }
        }
    }
}
