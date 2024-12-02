import type { SemanticActions } from "../types";

export interface ParsedSymbol {
    type: string;
    value: string;
}

export interface ParseTreeNode extends ParsedSymbol {
    action?: SemanticActions;
    children?: ParseTreeNode[];
}

export interface ASTNode extends ParseTreeNode {
    line: number;
    col: number;
}
