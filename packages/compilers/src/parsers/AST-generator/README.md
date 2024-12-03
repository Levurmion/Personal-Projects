# AST Node Behaviour

Each `ParseTreeNode` corresponding to a production rule can be configured to emit an `ASTNode`. At each point, the `ASTNode` can exhibit one of the following behavioural patterns:
- `CollectorASTNode`
- `ItemASTNode`
- `ListASTNode`
- `ListItemASTNode`

## collector
A `CollectorASTNode` is allowed to choose a subset of terms in its production rule to include as its children. The `ASTNode` will therefore only include subtrees generated by recursing into the `ParseTreeNodes` corresponding to the included terms. The `collector` pattern is useful for representing logical/arithmetic operations where the terminal symbolising the operation type can be replaced by a `CollectorASTNode` emitted when reducing symbols by the corresponding production rule.

```typescript
// We represent the following production as a `collector`.
// E -> E + T

// When transforming the parse tree, the node
const additionNode = collectorNode(parseTreeNode: parseTreeNode, includedTerms: [0, 2])
```

## item
An `item ASTNode` is the default behaviour configured for `ParseTreeNodes`
corresponding to terminal symbols. 