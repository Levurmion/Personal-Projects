export type Action = { type: string };
export type ReducerFn<S, A extends Action> = (currState: S, action: A) => S;
