import { Action } from "../types";
import { Store } from "./Store";

export type StoreActions<S extends Store<unknown, Action, unknown>> =
    S extends Store<unknown, infer A, unknown> ? A : never;
export type StoreState<S extends Store<unknown, Action, unknown>> =
    S extends Store<infer State, Action, unknown> ? State : never;
