export class Token {
    static regex: RegExp = /()/;
    static type: string;
    public value: string;

    constructor(value: string) {
        this.value = value;
    }

    static generate(input: string) {
        const match = this.regex.exec(input);
        if (match) {
            return new Token(match[1]);
        }
    }
}
