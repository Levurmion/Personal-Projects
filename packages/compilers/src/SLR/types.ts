import type { SLRClosureSet } from "./closure-set";

export interface SLRGotoSet {
    coreItems: SLRClosureSet;
    items: SLRClosureSet;
}

export interface SLRDFAState extends SLRGotoSet {
    nextStates: Record<string, number>;
}
