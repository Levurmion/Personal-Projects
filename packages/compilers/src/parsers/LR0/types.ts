import type { LR0ClosureSet } from "./closure-set";

export interface LR0GotoSet {
    coreItems: LR0ClosureSet;
    items: LR0ClosureSet;
}

export interface LR0DFAState extends LR0GotoSet {
    nextStates: Record<string, number>;
}
