import { Action, ReducerFn, ReducerState } from "../types";
import { useContext, useSyncExternalStore } from "react";
import { LocalStoreContext } from "./context";

export function useLocalStoreSelector<
    R extends ReducerFn<any, any>,
    Selector extends (state: ReducerState<R>) => any,
>(selector: Selector): ReturnType<Selector> {
    const storeRef = useContext(LocalStoreContext);
    if (!storeRef) {
        throw new Error("useLocalStoreSelector must be used inside LocalStoreDispatch.Provider");
    }

    // useSyncExternalStore will re-run our selector function whenever the store updates
    const subscribedState = useSyncExternalStore(storeRef.current.subscribe, () =>
        selector(storeRef.current.getSnapshot() as ReducerState<R>),
    );

    return subscribedState;
}
