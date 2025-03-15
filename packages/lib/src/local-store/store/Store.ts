import { ReducerFn } from "../types";

export class Store<S, A, I> {
    private reducer: ReducerFn<S, A>;
    private listeners: Function[];
    private state: S;

    constructor(reducerFn: ReducerFn<S, A>);
    constructor(reducerFn: ReducerFn<S, A>, init: S);
    constructor(reducerFn: ReducerFn<S, A>, init: I, initializer: (init: I) => S);

    constructor(reducer: ReducerFn<S, A>, init?: S | I, initializer?: (init: I) => S) {
        this.reducer = reducer;
        this.listeners = [];

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

    subscribe = (listener: Function) => {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    };

    getSnapshot = () => {
        return this.state;
    };

    dispatch = (action: A) => {
        this.state = this.reducer(this.state, action);
        for (const listener of this.listeners) {
            listener();
        }
    };
}
