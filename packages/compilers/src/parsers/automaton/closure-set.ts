import { EPSILON } from "..";
import type { Item } from "./item";
import * as CryptoJS from "crypto-js";

export class ClosureSet implements Iterable<Item> {
    private closureSet: Set<string>;
    private closureSetItems: Item[];

    constructor(items: Iterable<Item> = []) {
        this.closureSet = new Set<string>();
        this.closureSetItems = [];

        for (const item of items) {
            const itemName = item.getName();
            if (!this.closureSet.has(itemName)) {
                this.closureSet.add(itemName);
                this.closureSetItems.push(item);
            }
        }
    }

    public map<P extends (item: Item) => any>(fn: P): ReturnType<P>[] {
        return this.closureSetItems.map(fn);
    }

    public size(): number {
        return this.closureSet.size;
    }

    public add(item: Item): void {
        const itemName = item.getName();
        if (!this.closureSet.has(itemName)) {
            this.closureSet.add(itemName);
            this.closureSetItems.push(item);
        }
    }

    public delete(item: Item): void {
        const itemName = item.getName();
        this.closureSet.delete(itemName);
        this.closureSetItems = this.closureSetItems.filter((item) => item.getName() !== itemName);
    }

    public has(item: Item): boolean {
        return this.closureSet.has(item.getName());
    }

    public union(otherClosureSet: ClosureSet): ClosureSet {
        const unionClosureSet = new ClosureSet();
        for (const item of otherClosureSet) {
            unionClosureSet.add(item);
        }
        for (const item of this) {
            unionClosureSet.add(item);
        }
        return unionClosureSet;
    }

    /**
     * Checks whether `otherClosureSet` is equal to this `ClosureSet`.
     */
    public isEqual(otherClosureSet: ClosureSet): boolean {
        if (this.size() !== otherClosureSet.size()) {
            return false;
        } else {
            for (const item of otherClosureSet) {
                if (!this.has(item)) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Checks whether `otherClosureSet` is a subset of this `ClosureSet`. `otherClosureSet`
     * is a subset if:
     *
     * - `otherClosureSet.size() <= this.size()`
     * - all items in `otherClosureSet` are in this `ClosureSet`
     */
    public isSubset(otherClosureSet: ClosureSet): boolean {
        if (this.size() < otherClosureSet.size()) {
            return false;
        } else {
            for (const item of otherClosureSet) {
                if (!this.has(item)) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Obtain a set of all possible symbols that this `ClosureSet` can go to. These are symbols
     * immediately adjacent of the `DOT`.
     */
    public gotoSymbols(): Set<string> {
        const symbols = this.closureSetItems
            .map((item) => item.getAdjacentSymbol())
            .filter((symbol) => symbol !== null);
        return new Set(symbols);
    }

    /**
     * Obtain a signature ID of this `ClosureSet`. If two sets are equal, they will have the same
     * signature.
     */
    public getSignature(): string {
        const itemNames = Array.from(this.closureSet);
        itemNames.sort();
        return CryptoJS.MD5(itemNames.join()).toString(CryptoJS.enc.Hex);
    }

    /**
     * Retrieve all `Items` where the production rule is completed. These are items where the dot
     * `•` is at the end of all symbols in the RHS of the grammar expression.
     */
    public getCompletedItems(): Item[] {
        return this.closureSetItems.filter(
            (item) => item.shiftDotRight() === null || item.getAdjacentSymbol() === EPSILON,
        );
    }

    // iterator method
    public [Symbol.iterator](): Iterator<Item> {
        let idx = 0;
        const items = this.closureSetItems;

        return {
            next(): IteratorResult<Item> {
                if (idx < items.length) {
                    return { value: items[idx++], done: false };
                } else {
                    return { value: undefined, done: true };
                }
            },
        };
    }
}
