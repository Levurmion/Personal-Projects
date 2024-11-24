export type ArrayElementType<Arr> = Arr extends Array<infer T> ? T : never;
