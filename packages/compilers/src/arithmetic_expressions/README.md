# Arithmetic Expressions Compiler

This subpackage contains modules related to parsing arithmetic expressions into navigable ASTs.

## Supported Grammar

### Terminals

| **Token**  | **Regex**                | **Description**              |
| ---------- | ------------------------ | ---------------------------- |
| `"id"`     | `[a-zA-Z_][a-zA-Z0-9_]*` | variables and identifiers    |
| `"number"` | `\d+(\.?\d+)?`           | positive integers and floats |
| `"+"`      | `\+`                     | addition operator            |
| `"-"`      | `\-`                     | subtraction operator         |
| `"*"`      | `\*`                     | multiplication operator      |
| `"^"`      | `\^`                     | exponentiation operator      |
| `"="`      | `\=`                     | assignment operator          |
| `"/"`      | `\/`                     | division operator            |
| `"("`      | `\(`                     | open parentheses             |
| `")"`      | `\)`                     | close parentheses            |
| `"$"`      | `\$`                     | input terminator             |

### Non-Terminals in BNF

```
<EQ> ::= <EXP>"="<EXP>
<EXP> ::= <EXP>("+"|"-")<TERM> | <TERM>
<TERM> ::= <TERM>("/"|"*")<FACTOR> | <FACTOR>"^"<TERM>
<SIGNED_FACTOR> ::= "-"?<FACTOR>
<FACTOR> ::= "("<EXP>")" | "number" | "id"
```