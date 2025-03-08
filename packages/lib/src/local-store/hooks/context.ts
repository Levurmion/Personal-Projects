import { createContext, MutableRefObject, useContext } from "react";
import { Store } from "../store/Store";
import { Action } from "../types";

export const LocalStoreContext = createContext<MutableRefObject<
    Store<unknown, Action, unknown>
> | null>(null);
