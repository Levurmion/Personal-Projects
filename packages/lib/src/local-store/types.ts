export type Action = { type: string };
export type ReducerFn<S, A extends Action> = (currState: S, action: A) => S;
export type Dispatch<A extends Action> = (action: A) => void;

export type ReducerState<R extends ReducerFn<unknown, Action>> =
    R extends ReducerFn<infer S, Action> ? S : never;
export type ReducerActions<R extends ReducerFn<unknown, Action>> =
    R extends ReducerFn<unknown, infer A> ? A : never;
