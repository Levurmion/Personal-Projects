export class ReservedGrammarTerminalError extends Error {
    constructor(reservedTerminal: string) {
        super(`Grammar cannot use the reserved terminal type: ${reservedTerminal}`);
    }
}
