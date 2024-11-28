import type { SLRItem } from "./item";
import * as CryptoJS from "crypto-js";

export class SLRClosureSet implements Iterable<SLRItem> {
    private closureSet: Set<string>;
    private closureSetItems: SLRItem[];

    constructor(items: Iterable<SLRItem> = []) {
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

    public size(): number {
        return this.closureSet.size;
    }

    public add(item: SLRItem): void {
        const itemName = item.getName();
        if (!this.closureSet.has(itemName)) {
            this.closureSet.add(itemName);
            this.closureSetItems.push(item);
        }
    }

    public delete(item: SLRItem): void {
        const itemName = item.getName();
        this.closureSet.delete(itemName);
        this.closureSetItems = this.closureSetItems.filter((item) => item.getName() !== itemName);
    }

    public has(item: SLRItem): boolean {
        return this.closureSet.has(item.getName());
    }

    public union(otherClosureSet: SLRClosureSet): SLRClosureSet {
        const unionClosureSet = new SLRClosureSet();
        for (const item of otherClosureSet) {
            unionClosureSet.add(item);
        }
        for (const item of this) {
            unionClosureSet.add(item);
        }
        return unionClosureSet;
    }

    /**
     * Checks whether `otherClosureSet` is equal to this `SLRClosureSet`.
     */
    public isEqual(otherClosureSet: SLRClosureSet): boolean {
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
     * Checks whether `otherClosureSet` is a subset of this `SLRClosureSet`. `otherClosureSet`
     * is a subset if:
     *
     * - `otherClosureSet.size() <= this.size()`
     * - all items in `otherClosureSet` are in this `SLRClosureSet`
     */
    public isSubset(otherClosureSet: SLRClosureSet): boolean {
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
     * Obtain a set of all possible symbols that this `SLRClosureSet` can go to. These are symbols
     * immediately adjacent of the `DOT`.
     */
    public gotoSymbols(): Set<string> {
        const symbols = this.closureSetItems
            .map((item) => item.getAdjacentSymbol())
            .filter((symbol) => symbol !== null);
        return new Set(symbols);
    }

    /**
     * Obtain a signature ID of this `SLRClosureSet`. If two sets are equal, they will have the same
     * signature.
     */
    public getSignature(): string {
        const itemNames = Array.from(this.closureSet);
        itemNames.sort();
        return CryptoJS.MD5(itemNames.join()).toString(CryptoJS.enc.Hex);
    }

    // iterator method
    public [Symbol.iterator](): Iterator<SLRItem> {
        let idx = 0;
        const items = this.closureSetItems;

        return {
            next(): IteratorResult<SLRItem> {
                if (idx < items.length) {
                    return { value: items[idx++], done: false };
                } else {
                    return { value: undefined, done: true };
                }
            },
        };
    }
}
