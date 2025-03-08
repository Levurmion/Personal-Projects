import { Action, Dispatch, ReducerFn } from "../types";
import { ReducerAction, useContext } from "react";
import { LocalStoreContext } from "./context";
import { Store } from "../store/Store";
import { StoreActions } from "../store/types";

export function useLocalStoreDispatch<R extends ReducerFn<unknown, Action>>(): Dispatch<
    ReducerAction<R>
> {
    const storeRef = useContext(LocalStoreContext);
    if (!storeRef) {
        throw new Error(
            "useLocalStoreDispatch needs to be wrapped by a LocalStoreDispatch.Provider",
        );
    }

    const dispatchFn = storeRef.current.dispatch;
    return dispatchFn;
}
