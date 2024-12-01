export interface LexerToken<T extends string> {
    type: T;
    value: string;
    line?: number;
    col?: number;
}
