import type { Automaton } from "../automaton";
import type { ShiftReduceParserActions, Token } from "../types";
import type { ArrayElementType } from "../utility-types";

export interface ParsingTable<
    GTokens extends Token[] = Token[],
    GNonTerminals extends string[] = string[],
    GTokenTypes extends ArrayElementType<GTokens>["type"] = ArrayElementType<GTokens>["type"],
    GNonTerminalTypes extends ArrayElementType<GNonTerminals> = ArrayElementType<GNonTerminals>,
    GSymbols extends GTokenTypes | GNonTerminalTypes = GTokenTypes | GNonTerminalTypes,
> {
    ACTION_GOTO: (state: number, symbol: GSymbols) => ShiftReduceParserActions;
}

export type ParsingTableConstructor = new <
    GTokens extends Token[] = Token[],
    GNonTerminals extends string[] = string[],
>(
    automaton: Automaton<GTokens, GNonTerminals>,
) => ParsingTable;
