import { ReservedGrammarTerminalError } from "./errors";
import {
    ReservedGrammarTerminalTypes,
    type GrammarConfig,
    type NonTerminal,
    type Terminal,
} from "./types";

const RESERVED_GRAMMAR_TERMINALS = new Set<string>(Object.values(ReservedGrammarTerminalTypes));

export const createGrammar = <GTerminals extends Terminal[], GNonTerminals extends NonTerminal[]>(
    grammarConfig: GrammarConfig<GTerminals, GNonTerminals>,
) => {
    const grammarTerminals = [
        ...(grammarConfig.terminals.symbols ?? []),
        ...(grammarConfig.terminals.keywords ?? []),
        ...(grammarConfig.terminals.generics ?? []),
    ];
    for (const terminal of grammarTerminals) {
        if (RESERVED_GRAMMAR_TERMINALS.has(terminal.type)) {
            throw new ReservedGrammarTerminalError(terminal.type);
        }
    }

    return grammarConfig;
};
