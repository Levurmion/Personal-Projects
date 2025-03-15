export type ReducerFn<S, A> = (currState: S, action: A) => S;
export type Dispatch<A> = (action: A) => void;

export type ReducerState<R extends ReducerFn<any, any>> =
    R extends ReducerFn<infer S, any> ? S : never;
export type ReducerActions<R extends ReducerFn<any, any>> =
    R extends ReducerFn<unknown, infer A> ? A : never;
