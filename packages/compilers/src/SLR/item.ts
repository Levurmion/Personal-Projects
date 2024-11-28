import { DOT } from "..";
import type { ProductionRule } from "../types";

export class SLRItem {
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

    public shiftDotRight(): SLRItem | null {
        if (this.dotIdx === this.RHS.length - 1) {
            return null;
        } else {
            return new SLRItem(this.productionRule, this.dotIdx + 1);
        }
    }
}
