export interface TreeNode {
    type: string;
    value: string;
}

export interface ParseTreeNode extends TreeNode {
    children?: ParseTreeNode[];
    astNode?: ParseActions;
}

export interface ASTNode extends TreeNode {
    children?: ASTNode[];
}

/**
 * Emit an `ASTNode` corresponding to the current `ParseTreeNode` and
 * push as `children` of the last parent `ASTNode`. Forward the current
 * parent `ASTNode` to the next recursive call.
 */
type ItemASTNode = {
    type: "item";
};

/**
 * Emit an `ASTNode` corresponding to the current `ParseTreeNode` and
 * collect child `ASTNodes` recursively emitted by the nth `terms` of the
 * production rule as `children` of this node. Each child `ASTNode`
 * becomes the new parents of their subtrees.
 */
type CollectorASTNode = {
    type: "collector";
    includedTerms: number[];
    nodeValue?: string;
};

/**
 * Emit an `ASTNode`
 */
type ListASTNode = {
    type: "list";
};

export type ParseActions = ItemASTNode | CollectorASTNode | ListASTNode;
