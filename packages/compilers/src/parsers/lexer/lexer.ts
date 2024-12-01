import * as fs from "fs";
import * as readline from "readline";
import { TERMINATOR } from "..";
import type { Grammar, ReservedTokenTypes, Token } from "../types";
import type { ArrayElementType } from "../utility-types";
import { TokenizationError } from "./errors";
import type { LexerToken } from "./types";

export class Lexer<
    GTokens extends readonly Token[] = Token[],
    GNonTerminals extends readonly string[] = string[],
    GTokenTypes extends
        | ArrayElementType<GTokens>["type"]
        | ReservedTokenTypes.EPSILON
        | ReservedTokenTypes.TERMINATOR =
        | ArrayElementType<GTokens>["type"]
        | ReservedTokenTypes.EPSILON
        | ReservedTokenTypes.TERMINATOR,
> {
    private keywordTokens: Token[];
    private symbolTokens: Token[];
    private genericTokens: Token[];
    private line: number;
    private col: number;
    private processedCharacters: number;

    public readonly grammar: Grammar<GTokens, GNonTerminals>;
    public tokenStream: LexerToken<GTokenTypes>[];

    constructor(grammar: Grammar<GTokens, GNonTerminals>) {
        this.grammar = grammar;

        // modify regex to make sure they only match from the start of the input stream
        const transformedTokens = grammar.tokens.map((token) => {
            if (token.regex?.source.startsWith("^")) {
                return { ...token };
            } else {
                return {
                    ...token,
                    regex: token.regex ? new RegExp(`^${token.regex.source}`) : undefined,
                };
            }
        });

        // group tokens
        this.keywordTokens = transformedTokens
            .filter((token) => token.reservedKeyword)
            .map((token) => ({
                type: token.type,
                regex: token.regex ?? new RegExp(`^(${token.type})`),
            }));
        this.symbolTokens = transformedTokens.filter((token) => token.symbol);
        this.genericTokens = transformedTokens.filter(
            (token) => !token.reservedKeyword && !token.symbol,
        );

        // tracking line and col of the tokenStream
        this.line = 1;
        this.col = 0;
        this.processedCharacters = 0;
        this.tokenStream = [];
    }

    private matchTokenGroup(input: string, group: "keyword" | "symbol" | "generic"): boolean {
        const tokenGroup = this[`${group}Tokens`];
        for (const token of tokenGroup) {
            if (token.regex) {
                const match = input.match(token.regex);
                if (match) {
                    this.tokenStream.push({
                        type: token.type as GTokenTypes,
                        value: match[1],
                        line: this.line,
                        col: this.col + 1,
                    });
                    this.col += match[0].length;
                    this.processedCharacters += match[0].length;
                    return true;
                }
            }
        }

        return false;
    }

    private skipWhitespace(input: string): boolean {
        if (input.match(/^\n/) && !this.grammar.options?.ignoreNewline) {
            // ignore newlines - increment line number and reset col to 1
            this.line++;
            this.col = 0;
            this.processedCharacters++;
            return true;
        } else if (input.match(/^\s/) && !this.grammar.options?.ignoreWhitespace) {
            // ignore and skip whitespaces
            this.col++;
            this.processedCharacters++;
            return true;
        }

        return false;
    }

    /**
     * Tokenize a multi-line `string` into symbols defined by the given `Grammar` object. Read
     * the tokenized input from `Lexer.tokenStream`.
     */
    public tokenize(input: string) {
        this.tokenStream = [];
        this.processedCharacters = 0;
        this.line = 1;
        this.col = 0;

        while (this.processedCharacters < input.length) {
            const currInput = input.slice(this.processedCharacters);
            const skipWhitespace = this.skipWhitespace(currInput);
            if (skipWhitespace) {
                continue;
            }

            let matched = false;
            for (const group of ["keyword", "symbol", "generic"] as const) {
                matched = this.matchTokenGroup(currInput, group);
                if (matched) {
                    break;
                }
            }
            if (!matched) {
                throw new TokenizationError(
                    `Unrecognized Symbol at ${this.line}:${this.col}: "${currInput}"`,
                );
            }
        }

        // add terminator to the EOF
        this.tokenStream.push({
            type: TERMINATOR as GTokenTypes,
            value: TERMINATOR,
        });
    }

    /**
     * Tokenize a multi-line `file` into symbols defined by the given `Grammar` object. Read
     * the tokenized input from `Lexer.tokenStream`.
     */
    public async tokenizeFile(filepath: string) {
        const fileStream = fs.createReadStream(filepath);
        const fileReader = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });

        this.tokenStream = [];
        this.processedCharacters = 0;
        this.line = 1;
        this.col = 0;

        for await (const line of fileReader) {
            while (this.processedCharacters < line.length) {
                const currInput = line.slice(this.processedCharacters);
                const skipWhitespace = this.skipWhitespace(currInput);

                if (skipWhitespace) {
                    continue;
                }

                let matched = false;
                for (const group of ["keyword", "symbol", "generic"] as const) {
                    matched = this.matchTokenGroup(currInput, group);
                    if (matched) {
                        break;
                    }
                }
                if (!matched) {
                    throw new TokenizationError(
                        `Unrecognized Symbol at ${this.line}:${this.col}: "${currInput}"`,
                    );
                }
            }

            this.processedCharacters = 0;
            this.col = 0;
            this.line++;
        }

        // add terminator to the EOF
        this.tokenStream.push({
            type: TERMINATOR as GTokenTypes,
            value: TERMINATOR,
        });
    }
}
