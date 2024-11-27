import type { LR0Item } from "./item";

export class LR0ClosureSet implements Iterable<LR0Item> {
    private closureSet: Set<string>;
    private closureSetItems: LR0Item[];

    constructor() {
        this.closureSet = new Set<string>();
        this.closureSetItems = [];
    }

    public add(item: LR0Item): void {
        const itemName = item.getName();
        if (!this.closureSet.has(itemName)) {
            this.closureSet.add(itemName);
            this.closureSetItems.push(item);
        }
    }

    public delete(item: LR0Item): void {
        const itemName = item.getName();
        this.closureSet.delete(itemName);
        this.closureSetItems = this.closureSetItems.filter((item) => item.getName() !== itemName);
    }

    public has(item: LR0Item): boolean {
        return this.closureSet.has(item.getName());
    }

    public union(otherClosureSet: LR0ClosureSet): LR0ClosureSet {
        const unionClosureSet = new LR0ClosureSet();
        for (const item of otherClosureSet) {
            unionClosureSet.add(item);
        }
        for (const item of this) {
            unionClosureSet.add(item);
        }
        return unionClosureSet;
    }

    /**
     * Obtain a set of all possible symbols that this `LR0ClosureSet` can go to. These are symbols
     * immediately adjacent of the `DOT`.
     */
    public gotoSymbols(): Set<string> {
        const symbols = this.closureSetItems
            .map((item) => item.getAdjacentSymbol())
            .filter((symbol) => symbol !== null);
        return new Set(symbols);
    }

    // iterator method
    public [Symbol.iterator](): Iterator<LR0Item> {
        let idx = 0;
        const items = this.closureSetItems;

        return {
            next(): IteratorResult<LR0Item> {
                if (idx < items.length) {
                    return { value: items[idx++], done: false };
                } else {
                    return { value: undefined, done: true };
                }
            },
        };
    }
}
