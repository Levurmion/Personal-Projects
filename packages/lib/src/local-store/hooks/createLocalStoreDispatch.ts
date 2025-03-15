import { Dispatch, ReducerFn } from "../types";
import { ReducerAction, useContext } from "react";
import { LocalStoreContext } from "./context";

export const createLocalStoreDispatch = <R extends ReducerFn<any, any>>() => {
    return (): Dispatch<ReducerAction<R>> => {
        const storeRef = useContext(LocalStoreContext);
        if (!storeRef) {
            throw new Error(
                "useLocalStoreDispatch needs to be wrapped by a LocalStoreDispatch.Provider",
            );
        }

        const dispatchFn = storeRef.current.dispatch;
        return dispatchFn;
    };
};
