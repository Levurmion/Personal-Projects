import type { ASTNode, ParseTreeNode } from "./types";

function resolveListASTNodeItems(parseTreeNode: ParseTreeNode, listASTNode: ASTNode) {
    const { astNode } = parseTreeNode;

    if (astNode) {
        // parseTreeNode emits an ASTNode
        const emittedAstNode: ASTNode = {
            type: parseTreeNode.type,
            value: parseTreeNode.value,
        };

        switch (astNode.type) {
            case "item": {
                // The ASTNode is an item - just add to the list
                listASTNode.children?.push(emittedAstNode);
                break;
            }
            case "collector": {
                // The ASTNode is a collector - handle appropriately and add the
                // subtree to the list
                const collectorNode = handleCollectorASTNode(parseTreeNode);
                if (collectorNode) {
                    listASTNode.children?.push(collectorNode);
                }
                break;
            }
            case "list": {
                // The ASTNode is another list - pass astNode as the new parent
                // to a recursive call to create a nested list
                emittedAstNode.children = [];
                listASTNode.children?.push(handleListASTNode(parseTreeNode));
            }
        }
    } else {
        // parseTreeNode does not emit an ASTNode - skip to child nodes
        if (parseTreeNode.children) {
            for (const childParseTreeNode of parseTreeNode.children) {
                resolveListASTNodeItems(childParseTreeNode, listASTNode);
            }
        }
    }
}

function handleListASTNode(parseTreeNode: ParseTreeNode): ASTNode {
    const listASTNode: ASTNode = {
        type: parseTreeNode.type,
        value: parseTreeNode.value,
        children: [],
    };

    if (parseTreeNode.children) {
        for (const childParseTreeNode of parseTreeNode.children) {
            resolveListASTNodeItems(childParseTreeNode, listASTNode);
        }
    }

    return listASTNode;
}

function handleCollectorASTNode(parseTreeNode: ParseTreeNode): ASTNode | null {
    const { astNode } = parseTreeNode;

    if (astNode) {
        // parseTreeNode emits an ASTNode
        const emittedAstNode: ASTNode = {
            type: parseTreeNode.type,
            value: parseTreeNode.value,
        };

        switch (astNode.type) {
            case "item": {
                // The ASTNode is an item - terminate recursion and just
                // return emittedAstNode
                return emittedAstNode;
            }
            case "list": {
                // The ASTNode is a list
                return handleListASTNode(parseTreeNode);
            }
            case "collector": {
                // The ASTNode is another collector - only recurse into included terms
                emittedAstNode.value = astNode.nodeValue ?? parseTreeNode.value;
                emittedAstNode.children = [];
                const { includedTerms } = astNode;
                for (const termIdx of includedTerms) {
                    const parseTreeNodeChild = parseTreeNode.children?.[termIdx];
                    if (parseTreeNodeChild) {
                        const childAstNode = handleCollectorASTNode(parseTreeNodeChild);
                        if (childAstNode) {
                            emittedAstNode.children.push(childAstNode);
                        }
                    }
                }
                return emittedAstNode;
            }
        }
    } else {
        // parseTreeNode does not emit an ASTNode - skip to its child
        if (!parseTreeNode.children) {
            return null;
        } else if (parseTreeNode.children.length > 1) {
            const error = new Error(
                `A parseTreeNode under a collector ASTNode has more than child. This is ambiguous.`,
            );
            console.error(error.stack);
            throw error;
        } else {
            return handleCollectorASTNode(parseTreeNode.children[0]);
        }
    }
}

export function generateAST(parseTreeRoot: ParseTreeNode) {
    return handleCollectorASTNode(parseTreeRoot);
}
