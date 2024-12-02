export interface ParsedSymbol {
    type: string;
    value: string;
}

export interface ParseTreeNode extends ParsedSymbol {
    children?: ParseTreeNode[];
}

export interface ASTNode extends ParseTreeNode {
    line: number;
    col: number;
}
