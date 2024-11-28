import type { LR0ClosureSet } from "./closure-set";

export interface LR0DFAState {
    closure: LR0ClosureSet;
    nextStates: Record<string, number>;
}
