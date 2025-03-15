import { Meta, StoryObj } from "@storybook/react";
import {
    createLocalStoreDispatch,
    createLocalStoreSelector,
    LocalStoreContextProvider,
    useLocalStore,
} from "@repo/lib/local-store";
import { reducer } from "./LocalStore.reducer";
import { PropsWithChildren, ReducerState, useState } from "react";

export default {
    title: "Local Store",
    tags: ["autodocs"],
} satisfies Meta;

export const Story = () => {
    const storeRef = useLocalStore(reducer, 5, (startMoney) => ({
        name: "Harvey",
        money: startMoney,
        some: {
            nested: {
                field: 5,
            },
        },
    }));

    return (
        <LocalStoreContextProvider storeRef={storeRef}>
            <Nesting>
                <Nesting>
                    <Nesting>
                        <Field />
                        <Nesting>
                            <Field />
                            <Nesting>
                                <Field />
                            </Nesting>
                        </Nesting>
                    </Nesting>
                </Nesting>
            </Nesting>
        </LocalStoreContextProvider>
    );
};

const useLocalStoreDispatch = createLocalStoreDispatch<typeof reducer>();
const useLocalStoreSelector = createLocalStoreSelector<typeof reducer>();

const Nesting = ({ children }: PropsWithChildren) => {
    const [count, setCount] = useState(0);
    return (
        <div className="flex flex-row gap-2 border p-4">
            <button className="p-2" onClick={() => setCount((prev) => prev + 1)}>
                {count}
            </button>
            {children}
        </div>
    );
};

const Field = () => {
    const dispatch = useLocalStoreDispatch();
    const nestedFieldValue = useLocalStoreSelector((state) => state.some.nested.field);

    return (
        <button
            onClick={() => dispatch({ type: "INCREMENT_NESTED_FIELD" })}
            className="bg-slate-200 p-5"
        >
            {nestedFieldValue}
        </button>
    );
};
