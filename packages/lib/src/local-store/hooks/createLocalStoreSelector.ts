import { ReducerState, useContext, useSyncExternalStore } from "react";
import { LocalStoreContext } from "./context";
import { ReducerFn } from "../types";

export const createLocalStoreSelector = <R extends ReducerFn<any, any>>() => {
    return <SelectorResult>(
        selector: (state: ReducerState<R>) => SelectorResult,
    ): SelectorResult => {
        const storeRef = useContext(LocalStoreContext);
        if (!storeRef) {
            throw new Error(
                "useLocalStoreSelector must be used inside LocalStoreDispatch.Provider",
            );
        }

        // useSyncExternalStore will re-run our selector function whenever the store updates
        const subscribedState = useSyncExternalStore(storeRef.current.subscribe, () =>
            selector(storeRef.current.getSnapshot() as ReducerState<R>),
        );

        return subscribedState;
    };
};
