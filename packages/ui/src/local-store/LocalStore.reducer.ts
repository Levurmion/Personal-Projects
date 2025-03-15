interface State {
    name: string;
    money: number;
    some: {
        nested: {
            field: number;
        };
    };
}

export type Action =
    | { type: "SET_NAME"; payload: string }
    | { type: "SET_MONEY"; payload: number }
    | { type: "INCREMENT_NESTED_FIELD" };

// 4. Implement the reducer
export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "SET_NAME":
            return {
                ...state,
                name: action.payload,
            };

        case "SET_MONEY":
            return {
                ...state,
                money: action.payload,
            };

        case "INCREMENT_NESTED_FIELD":
            return {
                ...state,
                some: {
                    ...state.some,
                    nested: {
                        ...state.some.nested,
                        field: state.some.nested.field + 1,
                    },
                },
            };

        default:
            return state;
    }
}
