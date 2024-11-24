# JSON Parser

## Grammar

### Terminals

| **Terminals** | **Regex**            | **Description**                                           |
| ------------- | -------------------- | --------------------------------------------------------- |
| `str_lit`     | `\"(\\.\|[^"\\])*\"` | string literals enclosed in double quotes                 |
| `num_lit`     | `-?(\d+)(.\d+)?`     | number literals - positive/negative integers and decimals |
| `true`        | `true`               | boolean true                                              |
| `false`       | `false`              | boolean false                                             |
| `null`        | `null`               | null value                                                |
| `{`           | `\{`                 | start of an object                                        |
| `}`           | `\}`                 | end of an object                                          |
| `[`           | `\[`                 | start of an array                                         |
| `]`           | `\]`                 | end of an array                                           |
| `:`           | `:`                  | entry delimiter                                           |
| `,`           | `,`                  | item delimiter                                            |

### Non-Terminals

```
<VALUE> ::= str_lit | num_lit | true | false | null | <OBJECT> | <ARRAY>

<OBJECT> ::= {<ENTRIES>}
<ENTRIES> ::= <ENTRY><ENTRY_T> | ε
<ENTRY_T> ::= ,<ENTRY> | ε
<ENTRY> ::= str_lit:<VALUE>

<ARRAY> ::= [<ELEMENTS>]
<ELEMENTS> ::= <VALUE><ELEMENT_T> | ε
<ELEMENT_T> ::= ,<VALUE><ELEMENT_T> | ε
```