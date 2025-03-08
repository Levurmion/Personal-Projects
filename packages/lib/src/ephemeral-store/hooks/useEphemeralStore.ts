import { Store } from "../store/Store";
import { Action, ReducerFn } from "../types";
import { MutableRefObject, useRef } from "react";

export function useEphemeralStore<S, A extends Action, I>(
    reducer: ReducerFn<S, A>,
): MutableRefObject<Store<S, A, I>>;
export function useEphemeralStore<S, A extends Action, I>(
    reducer: ReducerFn<S, A>,
    init: S,
): MutableRefObject<Store<S, A, I>>;
export function useEphemeralStore<S, A extends Action, I>(
    reducer: ReducerFn<S, A>,
    init: I,
    initializer: (init: I) => S,
): MutableRefObject<Store<S, A, I>>;

export function useEphemeralStore<S, A extends Action, I>(
    reducer: ReducerFn<S, A>,
    init?: S | I,
    initializer?: (arg: I) => S,
) {
    const storeRef = useRef(
        (() => {
            if (init && initializer) {
                return new Store(reducer, init as I, initializer);
            } else if (init) {
                return new Store(reducer, init as S);
            } else {
                return new Store(reducer);
            }
        })(),
    );

    return storeRef;
}
