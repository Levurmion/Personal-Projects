import type { ParseTreeNode } from "./types";

export const parseTree: ParseTreeNode = {
    type: "VALUE",
    value: "VALUE",
    children: [
        {
            type: "OBJECT",
            value: "OBJECT",
            children: [
                {
                    type: "ENTRIES?",
                    value: "ENTRIES?",
                    children: [
                        {
                            type: "ENTRY?",
                            value: "ENTRY?",
                            children: [
                                {
                                    type: "ENTRY",
                                    value: "ENTRY",
                                    children: [
                                        { type: "{", value: "{" },
                                        {
                                            type: "VALUE",
                                            value: "VALUE",
                                            children: [
                                                {
                                                    type: "ARRAY",
                                                    value: "ARRAY",
                                                    children: [
                                                        {
                                                            type: "KEY",
                                                            value: "KEY",
                                                            children: [
                                                                { type: "str_lit", value: "array" },
                                                                { type: ":", value: ":" },
                                                            ],
                                                        },
                                                        {
                                                            type: "ELEMENTS?",
                                                            value: "ELEMENTS?",
                                                            children: [
                                                                { type: "[", value: "[" },
                                                                {
                                                                    type: "ELEMENT?",
                                                                    value: "ELEMENT?",
                                                                    children: [
                                                                        {
                                                                            type: "VALUE",
                                                                            value: "VALUE",
                                                                            children: [
                                                                                {
                                                                                    type: "num_lit",
                                                                                    value: "1",
                                                                                },
                                                                            ],
                                                                        },
                                                                        { type: ",", value: "," },
                                                                        {
                                                                            type: "ELEMENT?",
                                                                            value: "ELEMENT?",
                                                                            children: [
                                                                                {
                                                                                    type: "VALUE",
                                                                                    value: "VALUE",
                                                                                    children: [
                                                                                        {
                                                                                            type: "num_lit",
                                                                                            value: "2",
                                                                                        },
                                                                                    ],
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
                                { type: ",", value: "," },
                                {
                                    type: "ENTRY?",
                                    value: "ENTRY?",
                                    children: [
                                        {
                                            type: "ENTRY",
                                            value: "ENTRY",
                                            children: [
                                                {
                                                    type: "KEY",
                                                    value: "KEY",
                                                    children: [
                                                        { type: "num_lit", value: "1" },
                                                        { type: ":", value: ":" },
                                                    ],
                                                },
                                                {
                                                    type: "VALUE",
                                                    value: "VALUE",
                                                    children: [{ type: "false", value: "false" }],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                { type: "}", value: "}" },
            ],
        },
    ],
};
