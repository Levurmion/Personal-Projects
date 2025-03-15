import { createContext, MutableRefObject, PropsWithChildren, useContext } from "react";
import { Store } from "../store/Store";
import { Action } from "../types";

type ContextStore = Store<unknown, Action, unknown>;

export const LocalStoreContext = createContext<MutableRefObject<ContextStore> | null>(null);

interface LocalStoreContextProvider<S, A extends Action, I> extends PropsWithChildren {
    storeRef: MutableRefObject<Store<S, A, I>>;
}

export const LocalStoreContextProvider = <S extends unknown, A extends Action, I extends unknown>({
    storeRef,
    children,
}: LocalStoreContextProvider<S, A, I>) => {
    return (
        <LocalStoreContext.Provider value={storeRef as MutableRefObject<ContextStore>}>
            {children}
        </LocalStoreContext.Provider>
    );
};
