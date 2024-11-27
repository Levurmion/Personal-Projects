import { AUGMENTED_START, DOT } from "..";
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
    private language: Language<GTokens, GNonTerminals>;

    constructor(language: Language<GTokens, GNonTerminals>) {
        // ensure that this is an augmented language
        if (language.grammar.startSymbol !== AUGMENTED_START) {
            throw new Error(`Cannot construct an LR0ItemSet without an augmented grammar.`);
        }

        this.language = language;
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
            if (adjSymbol === null || this.language.terminalsSet.has(adjSymbol)) {
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
}
