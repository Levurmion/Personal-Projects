export type Action = { type: string };
export type ReducerFn<S, A extends Action> = (currState: S, action: A) => S;
export type Dispatch<A extends Action> = (action: A) => void;

export type ReducerState<R extends ReducerFn<any, any>> =
    R extends ReducerFn<infer S, any> ? S : never;
export type ReducerActions<R extends ReducerFn<any, any>> =
    R extends ReducerFn<unknown, infer A> ? A : never;
