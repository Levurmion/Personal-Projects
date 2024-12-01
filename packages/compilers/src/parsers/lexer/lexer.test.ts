import { describe, expect, test } from "vitest";
import { Lexer } from "./lexer";
import { jsonGrammar, simpleSqlGrammar } from "../tests/mocks";
import { TokenizationError } from "./errors";
import { TERMINATOR } from "..";

describe("Lexer Testing Suite", () => {
    test("Lexer can tokenize a valid input string", () => {
        const lexer = new Lexer(jsonGrammar);
        const input = `{ "property": [ true, false, null ] }`;
        lexer.tokenize(input);

        expect(lexer.tokenStream).toEqual([
            { type: "{", value: "{", line: 1, col: 1 },
            { type: "str_lit", value: "property", line: 1, col: 3 },
            { type: ":", value: ":", line: 1, col: 13 },
            { type: "[", value: "[", line: 1, col: 15 },
            { type: "true", value: "true", line: 1, col: 17 },
            { type: ",", value: ",", line: 1, col: 21 },
            { type: "false", value: "false", line: 1, col: 23 },
            { type: ",", value: ",", line: 1, col: 28 },
            { type: "null", value: "null", line: 1, col: 30 },
            { type: "]", value: "]", line: 1, col: 35 },
            { type: "}", value: "}", line: 1, col: 37 },
            { type: TERMINATOR, value: TERMINATOR },
        ]);
    });

    test("Lexer can tokenize a multi-line input string", () => {
        const lexer = new Lexer(jsonGrammar);
        const input = `
            {
                "property": [
                    true,
                    false,
                    null
                ]
            }
        `;
        lexer.tokenize(input);

        expect(lexer.tokenStream).toEqual([
            { type: "{", value: "{", line: 2, col: 13 },
            { type: "str_lit", value: "property", line: 3, col: 17 },
            { type: ":", value: ":", line: 3, col: 27 },
            { type: "[", value: "[", line: 3, col: 29 },
            { type: "true", value: "true", line: 4, col: 21 },
            { type: ",", value: ",", line: 4, col: 25 },
            { type: "false", value: "false", line: 5, col: 21 },
            { type: ",", value: ",", line: 5, col: 26 },
            { type: "null", value: "null", line: 6, col: 21 },
            { type: "]", value: "]", line: 7, col: 17 },
            { type: "}", value: "}", line: 8, col: 13 },
            { type: TERMINATOR, value: TERMINATOR },
        ]);
    });

    test("Lexer will throw a TokenizationError if input contains an unrecognized symbol", () => {
        const lexer = new Lexer(jsonGrammar);
        const input = `{ "positive integer": +20 }`;

        try {
            lexer.tokenize(input);
        } catch (e) {
            if (e instanceof TokenizationError) {
                expect(e instanceof TokenizationError).toBeTruthy();
                expect(e.message).toBe(`Unrecognized Symbol at 1:22: "+20 }"`);
            }
        }
    });

    test("Lexer can effectively deal with keywords", () => {
        const lexer = new Lexer(simpleSqlGrammar);
        const input = `SELECT column_a, column_b, column_c FROM ( SELECT * FROM table_xyz );`;

        lexer.tokenize(input);
        expect(lexer.tokenStream).toEqual([
            { type: "SELECT", value: "SELECT", line: 1, col: 1 },
            { type: "id", value: "column_a", line: 1, col: 8 },
            { type: ",", value: ",", line: 1, col: 16 },
            { type: "id", value: "column_b", line: 1, col: 18 },
            { type: ",", value: ",", line: 1, col: 26 },
            { type: "id", value: "column_c", line: 1, col: 28 },
            { type: "FROM", value: "FROM", line: 1, col: 37 },
            { type: "(", value: "(", line: 1, col: 42 },
            { type: "SELECT", value: "SELECT", line: 1, col: 44 },
            { type: "*", value: "*", line: 1, col: 51 },
            { type: "FROM", value: "FROM", line: 1, col: 53 },
            { type: "id", value: "table_xyz", line: 1, col: 58 },
            { type: ")", value: ")", line: 1, col: 68 },
            { type: ";", value: ";", line: 1, col: 69 },
            { type: TERMINATOR, value: TERMINATOR },
        ]);
    });

    test("Lexer can tokenize files", async () => {
        const lexer = new Lexer(jsonGrammar);
        await lexer.tokenizeFile("./src/parsers/tests/mock.json");

        expect(lexer.tokenStream).toEqual([
            { type: "{", value: "{", line: 1, col: 1 },
            { type: "str_lit", value: "level_1", line: 2, col: 5 },
            { type: ":", value: ":", line: 2, col: 14 },
            { type: "{", value: "{", line: 2, col: 16 },
            { type: "str_lit", value: "level_2", line: 3, col: 9 },
            { type: ":", value: ":", line: 3, col: 18 },
            { type: "{", value: "{", line: 3, col: 20 },
            { type: "str_lit", value: "array", line: 4, col: 13 },
            { type: ":", value: ":", line: 4, col: 20 },
            { type: "[", value: "[", line: 4, col: 22 },
            { type: "num_lit", value: "1", line: 4, col: 23 },
            { type: ",", value: ",", line: 4, col: 24 },
            { type: "num_lit", value: "2", line: 4, col: 26 },
            { type: ",", value: ",", line: 4, col: 27 },
            { type: "num_lit", value: "3", line: 4, col: 29 },
            { type: "]", value: "]", line: 4, col: 30 },
            { type: ",", value: ",", line: 4, col: 31 },
            { type: "str_lit", value: "true", line: 5, col: 13 },
            { type: ":", value: ":", line: 5, col: 19 },
            { type: "true", value: "true", line: 5, col: 21 },
            { type: ",", value: ",", line: 5, col: 25 },
            { type: "str_lit", value: "false", line: 6, col: 13 },
            { type: ":", value: ":", line: 6, col: 20 },
            { type: "false", value: "false", line: 6, col: 22 },
            { type: ",", value: ",", line: 6, col: 27 },
            { type: "str_lit", value: "null", line: 7, col: 13 },
            { type: ":", value: ":", line: 7, col: 19 },
            { type: "null", value: "null", line: 7, col: 21 },
            { type: "}", value: "}", line: 8, col: 9 },
            { type: "}", value: "}", line: 9, col: 5 },
            { type: ",", value: ",", line: 9, col: 6 },
            { type: "str_lit", value: "property", line: 10, col: 5 },
            { type: ":", value: ":", line: 10, col: 15 },
            { type: "str_lit", value: "Hello World!", line: 10, col: 17 },
            { type: ",", value: ",", line: 10, col: 31 },
            { type: "str_lit", value: "positive_number", line: 11, col: 5 },
            { type: ":", value: ":", line: 11, col: 22 },
            { type: "num_lit", value: "4.2", line: 11, col: 24 },
            { type: ",", value: ",", line: 11, col: 27 },
            { type: "str_lit", value: "negative_number", line: 12, col: 5 },
            { type: ":", value: ":", line: 12, col: 22 },
            { type: "num_lit", value: "-3.22", line: 12, col: 24 },
            { type: "}", value: "}", line: 13, col: 1 },
            { type: "$", value: "$" },
        ]);
    });
});
