import type { ParseTreeNode } from "./types";

export const simpleParseTree: ParseTreeNode = {
    type: "VALUE",
    value: "VALUE",
    children: [
        {
            type: "OBJECT",
            value: "OBJECT",
            astNode: {
                type: "list",
            },
            children: [
                {
                    type: "{",
                    value: "{",
                },
                {
                    type: "ENTRIES?",
                    value: "ENTRIES?",
                    children: [
                        {
                            type: "ENTRY",
                            value: "ENTRY",
                            astNode: {
                                type: "collector",
                                includedTerms: [0, 2],
                            },
                            children: [
                                {
                                    type: "KEY",
                                    value: "KEY",
                                    children: [
                                        {
                                            type: "str_lit",
                                            value: "one",
                                            astNode: {
                                                type: "item",
                                            },
                                        },
                                    ],
                                },
                                {
                                    type: ":",
                                    value: ":",
                                },
                                {
                                    type: "VALUE",
                                    value: "VALUE",
                                    children: [
                                        {
                                            type: "false",
                                            value: "false",
                                            astNode: {
                                                type: "item",
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            type: "ENTRY?",
                            value: "ENTRY?",
                            children: [
                                {
                                    type: ",",
                                    value: ",",
                                },
                                {
                                    type: "ENTRY",
                                    value: "ENTRY",
                                    astNode: {
                                        type: "collector",
                                        includedTerms: [0, 2],
                                    },
                                    children: [
                                        {
                                            type: "KEY",
                                            value: "KEY",
                                            children: [
                                                {
                                                    type: "str_lit",
                                                    value: "two",
                                                    astNode: {
                                                        type: "item",
                                                    },
                                                },
                                            ],
                                        },
                                        {
                                            type: ":",
                                            value: ":",
                                        },
                                        {
                                            type: "VALUE",
                                            value: "VALUE",
                                            children: [
                                                {
                                                    type: "true",
                                                    value: "true",
                                                    astNode: {
                                                        type: "item",
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    type: "ENTRY?",
                                    value: "ENTRY?",
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    type: "}",
                    value: "}",
                },
            ],
        },
    ],
};

export const nestedParseTree: ParseTreeNode = {
    type: "VALUE",
    value: "VALUE",
    children: [
        {
            type: "OBJECT",
            value: "OBJECT",
            astNode: {
                type: "list",
            },
            children: [
                { type: "{", value: "{" },
                {
                    type: "ENTRIES?",
                    value: "ENTRIES?",
                    children: [
                        {
                            type: "ENTRY",
                            value: "ENTRY",
                            astNode: {
                                type: "collector",
                                includedTerms: [0, 2],
                            },
                            children: [
                                {
                                    type: "KEY",
                                    value: "KEY",
                                    children: [
                                        {
                                            type: "str_lit",
                                            value: "one",
                                            astNode: {
                                                type: "item",
                                            },
                                        },
                                    ],
                                },
                                { type: ":", value: ":" },
                                {
                                    type: "VALUE",
                                    value: "VALUE",
                                    children: [
                                        {
                                            type: "false",
                                            value: "false",
                                            astNode: {
                                                type: "item",
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            type: "ENTRY?",
                            value: "ENTRY?",
                            children: [
                                { type: ",", value: "," },
                                {
                                    type: "ENTRY",
                                    value: "ENTRY",
                                    astNode: {
                                        type: "collector",
                                        includedTerms: [0, 2],
                                    },
                                    children: [
                                        {
                                            type: "KEY",
                                            value: "KEY",
                                            children: [
                                                {
                                                    type: "str_lit",
                                                    value: "array",
                                                    astNode: {
                                                        type: "item",
                                                    },
                                                },
                                            ],
                                        },
                                        { type: ":", value: ":" },
                                        {
                                            type: "VALUE",
                                            value: "VALUE",
                                            children: [
                                                {
                                                    type: "ARRAY",
                                                    value: "ARRAY",
                                                    astNode: {
                                                        type: "list",
                                                    },
                                                    children: [
                                                        { type: "[", value: "[" },
                                                        {
                                                            type: "ELEMENTS?",
                                                            value: "ELEMENTS?",
                                                            children: [
                                                                {
                                                                    type: "VALUE",
                                                                    value: "VALUE",
                                                                    children: [
                                                                        {
                                                                            type: "num_lit",
                                                                            value: "1",
                                                                            astNode: {
                                                                                type: "item",
                                                                            },
                                                                        },
                                                                    ],
                                                                },
                                                                {
                                                                    type: "ELEMENT?",
                                                                    value: "ELEMENT?",
                                                                    children: [
                                                                        { type: ",", value: "," },
                                                                        {
                                                                            type: "VALUE",
                                                                            value: "VALUE",
                                                                            children: [
                                                                                {
                                                                                    type: "num_lit",
                                                                                    value: "2",
                                                                                    astNode: {
                                                                                        type: "item",
                                                                                    },
                                                                                },
                                                                            ],
                                                                        },
                                                                        {
                                                                            type: "ELEMENT?",
                                                                            value: "ELEMENT?",
                                                                            children: [
                                                                                {
                                                                                    type: ",",
                                                                                    value: ",",
                                                                                },
                                                                                {
                                                                                    type: "VALUE",
                                                                                    value: "VALUE",
                                                                                    children: [
                                                                                        {
                                                                                            type: "OBJECT",
                                                                                            value: "OBJECT",
                                                                                            astNode:
                                                                                                {
                                                                                                    type: "list",
                                                                                                },
                                                                                            children:
                                                                                                [
                                                                                                    {
                                                                                                        type: "{",
                                                                                                        value: "{",
                                                                                                    },
                                                                                                    {
                                                                                                        type: "ENTRIES?",
                                                                                                        value: "ENTRIES?",
                                                                                                        children:
                                                                                                            [
                                                                                                                {
                                                                                                                    type: "ENTRY",
                                                                                                                    value: "ENTRY",
                                                                                                                    astNode:
                                                                                                                        {
                                                                                                                            type: "collector",
                                                                                                                            includedTerms:
                                                                                                                                [
                                                                                                                                    0,
                                                                                                                                    2,
                                                                                                                                ],
                                                                                                                        },
                                                                                                                    children:
                                                                                                                        [
                                                                                                                            {
                                                                                                                                type: "KEY",
                                                                                                                                value: "KEY",
                                                                                                                                children:
                                                                                                                                    [
                                                                                                                                        {
                                                                                                                                            type: "str_lit",
                                                                                                                                            value: "nested",
                                                                                                                                            astNode:
                                                                                                                                                {
                                                                                                                                                    type: "item",
                                                                                                                                                },
                                                                                                                                        },
                                                                                                                                    ],
                                                                                                                            },
                                                                                                                            {
                                                                                                                                type: ":",
                                                                                                                                value: ":",
                                                                                                                            },
                                                                                                                            {
                                                                                                                                type: "VALUE",
                                                                                                                                value: "VALUE",
                                                                                                                                children:
                                                                                                                                    [
                                                                                                                                        {
                                                                                                                                            type: "true",
                                                                                                                                            value: "true",
                                                                                                                                            astNode:
                                                                                                                                                {
                                                                                                                                                    type: "item",
                                                                                                                                                },
                                                                                                                                        },
                                                                                                                                    ],
                                                                                                                            },
                                                                                                                        ],
                                                                                                                },
                                                                                                                {
                                                                                                                    type: "ENTRY?",
                                                                                                                    value: "ENTRY?",
                                                                                                                    children:
                                                                                                                        [],
                                                                                                                },
                                                                                                            ],
                                                                                                    },
                                                                                                    {
                                                                                                        type: "}",
                                                                                                        value: "}",
                                                                                                    },
                                                                                                ],
                                                                                        },
                                                                                    ],
                                                                                },
                                                                                {
                                                                                    type: "ELEMENT?",
                                                                                    value: "ELEMENT?",
                                                                                    children: [],
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        { type: "]", value: "]" },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                                { type: "ENTRY?", value: "ENTRY?", children: [] },
                            ],
                        },
                    ],
                },
                { type: "}", value: "}" },
            ],
        },
    ],
};

export const arithmeticParseTree: ParseTreeNode = {
    type: "E",
    value: "E",
    astNode: {
        type: "collector",
        includedTerms: [0, 2],
        nodeValue: "+",
    },
    children: [
        {
            type: "E",
            value: "E",
            astNode: {
                type: "collector",
                includedTerms: [0, 2],
                nodeValue: "+",
            },
            children: [
                {
                    type: "E",
                    value: "E",
                    children: [
                        {
                            type: "T",
                            value: "T",
                            children: [
                                {
                                    type: "F",
                                    value: "F",
                                    children: [
                                        {
                                            type: "id",
                                            value: "x",
                                            astNode: {
                                                type: "item",
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    type: "+",
                    value: "+",
                },
                {
                    type: "T",
                    value: "T",
                    astNode: {
                        type: "collector",
                        includedTerms: [0, 2],
                        nodeValue: "*",
                    },
                    children: [
                        {
                            type: "T",
                            value: "T",
                            children: [
                                {
                                    type: "F",
                                    value: "F",
                                    children: [
                                        {
                                            type: "id",
                                            value: "y",
                                            astNode: {
                                                type: "item",
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            type: "*",
                            value: "*",
                        },
                        {
                            type: "F",
                            value: "F",
                            children: [
                                {
                                    type: "id",
                                    value: "z",
                                    astNode: {
                                        type: "item",
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "+",
            value: "+",
        },
        {
            type: "T",
            value: "T",
            children: [
                {
                    type: "F",
                    value: "F",
                    children: [
                        {
                            type: "id",
                            value: "id",
                            astNode: {
                                type: "item",
                            },
                        },
                    ],
                },
            ],
        },
    ],
};
