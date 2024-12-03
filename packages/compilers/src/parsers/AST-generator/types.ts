export interface TreeNode {
    type: string;
    value: string;
}

export interface ParseTreeNode extends TreeNode {
    children?: ParseTreeNode[];
    action?: "collect" | "push";
}

export interface ASTNode {
    children?: ASTNode[];
}

/**
 * Emit an `ASTNode` corresponding to the current `ParseTreeNode` and
 * push as `children` of the last parent `ASTNode`. Forward the current
 * parent `ASTNode` to the next recursive call.
 */
type PushAction = {
    action: "push";
};

/**
 * Emit an `ASTNode` corresponding to the current `ParseTreeNode` and
 * collect child `ASTNodes` recursively emitted by the nth `terms` of the
 * production rule as `children` of this node. Each child `ASTNode`
 * becomes the new parents of their subtrees.
 */
type CollectAction = {
    action: "collect";
    terms: number[];
};

type;
