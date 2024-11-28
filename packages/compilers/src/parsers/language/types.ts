import type { ProductionRule } from "../types";

export interface EnumeratedProductionRules<
    GTokenTypes extends string,
    GNonTerminalTypes extends string,
> {
    [id: number]: ProductionRule<GTokenTypes, GNonTerminalTypes>;
}
