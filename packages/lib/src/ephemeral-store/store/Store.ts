import { Action, ReducerFn } from "../types";

export class Store<S, A extends Action, I> {
    private reducer: ReducerFn<S, A>;
    private listeners: Function[] = [];
    private state: S;

    constructor(reducerFn: ReducerFn<S, A>);
    constructor(reducerFn: ReducerFn<S, A>, init: S);
    constructor(reducerFn: ReducerFn<S, A>, init: I, initializer: (init: I) => S);

    constructor(reducer: ReducerFn<S, A>, init?: S | I, initializer?: (init: I) => S) {
        this.reducer = reducer;

        if (init) {
            if (initializer) {
                this.state = initializer(init as I);
            } else {
                this.state = init as S;
            }
        } else {
            this.state = {} as S;
        }
    }

    subscribe(listener: Function) {
        this.listeners.push(listener);
        return () => this.listeners.filter((l) => l !== listener);
    }

    getSnapshot() {
        return this.state;
    }

    dispatch(action: A) {
        this.state = this.reducer(this.state, action);
        for (const listener of this.listeners) {
            listener();
        }
    }
}

const initState = {
    name: "me",
    money: 10,
};

type State = typeof initState;

type Actions =
    | {
          type: "increment_money";
      }
    | {
          type: "change_name";
          payload: string;
      };

const reducer = (state: State, action: Actions): State => {
    switch (action.type) {
        case "change_name": {
            return {
                ...state,
                name: action.payload,
            };
        }
        case "increment_money": {
            return {
                ...state,
                money: state.money + 1,
            };
        }
        default: {
            return state;
        }
    }
};

const store = new Store(reducer, { startName: "wow" }, ({ startName }) => ({
    name: "me",
    money: 0,
}));
