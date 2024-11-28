import type { ClosureSet } from "./closure-set";

export interface GotoSet {
    coreItems: ClosureSet;
    items: ClosureSet;
}

export interface DFAState extends GotoSet {
    nextStates: Record<string, number>;
}
