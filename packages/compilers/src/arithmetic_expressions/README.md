# Arithmetic Expressions Compiler

This subpackage contains modules related to parsing arithmetic expressions into navigable ASTs.

## Supported Grammar

### Terminals

| **Token**  | **Regex**                | **Description**              |
| ---------- | ------------------------ | ---------------------------- |
| `<id>`     | `[a-zA-Z_][a-zA-Z0-9_]*` | variables and identifiers    |
| `<number>` | `\d+(\.?\d+)?`           | positive integers and floats |
| `<+>`      | `\+`                     | addition operator            |
| `<->`      | `\-`                     | subtraction operator         |
| `<*>`      | `\*`                     | multiplication operator      |
| `<^>`      | `\^`                     | exponentiation operator      |
| `<=>`      | `\=`                     | assignment operator          |
| `</>`      | `\/`                     | division operator            |
| `<(>`      | `\(`                     | open parentheses             |
| `<)>`      | `\)`                     | close parentheses            |

### Non-Terminals

| **Non-Terminal**    | **Production Rule**                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------- |
| `<EQ>`              | `<id><=><EXP> \| <EXP><=><EXP>`                                                             |
| `<EXP>`             | `<TERM><EXP_TAIL>`                                                                          |
| `<EXP_TAIL>`        | `<+><TERM><EXP_TAIL> \| <-><TERM><EXP_TAIL \| ε`                                            |
| `<TERM>`            | `<FACTOR><TERM_TAIL>`                                                                       |
| `<TERM_TAIL>`       | `<^><TERM> \| <\><FACTOR><TERM_TAIL> \| <*><FACTOR><TERM_TAIL> \| <FACTOR><TERM_TAIL> \| ε` |
| `<FACTOR>`          | `<FACTOR_TERMINAL> \| <(><EXP><)>`                                                          |
| `<FACTOR_TERMINAL>` | `<number> \| <id> \| <-><FACTOR_TERMINAL>`                                                  |