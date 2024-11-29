import { DOT, EPSILON } from "..";
import type { ProductionRule } from "../types";

export class Item {
    public readonly nonTerminal: string;
    public readonly originalProduction: string[];
    public readonly RHS: string[];

    private productionRule: ProductionRule;
    private dotIdx: number;

    constructor(productionRule: ProductionRule, dotPosition: number = 0) {
        this.productionRule = productionRule;
        this.dotIdx = dotPosition;
        this.nonTerminal = productionRule.nonTerminal;
        this.originalProduction = productionRule.production;
        this.RHS = [
            ...productionRule.production.slice(0, dotPosition),
            DOT,
            ...productionRule.production.slice(dotPosition),
        ];
    }

    public getName(): string {
        return `${this.nonTerminal}->${this.RHS.join("")}`;
    }

    public getAdjacentSymbol(): string | null {
        return this.dotIdx < this.RHS.length - 1 ? this.RHS[this.dotIdx + 1] : null;
    }

    public shiftDotRight(): Item | null {
        if (this.dotIdx === this.RHS.length - 1 || this.getAdjacentSymbol() === EPSILON) {
            return null;
        } else {
            return new Item(this.productionRule, this.dotIdx + 1);
        }
    }
}
