import { Action, ReducerFn, ReducerState } from "../types";
import { useContext, useSyncExternalStore } from "react";
import { LocalStoreContext } from "./context";

export function useLocalStoreSelector<R extends ReducerFn<unknown, Action>, SelectorState>(
    selector: (state: ReducerState<R>) => SelectorState,
): SelectorState {
    const storeRef = useContext(LocalStoreContext);
    if (!storeRef) {
        throw new Error(
            "useLocalStoreSelector needs to be wrapped by a LocalStoreDispatch.Provider",
        );
    }

    const subscribedState = useSyncExternalStore(storeRef.current.subscribe, () =>
        selector(storeRef.current.getSnapshot() as ReducerState<R>),
    );
    return subscribedState;
}
