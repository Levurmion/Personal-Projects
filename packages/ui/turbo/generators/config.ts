import type { PlopTypes } from "@turbo/gen";
import type { ActionType } from "node-plop/types";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
    plop.setGenerator("component", {
        description: "Generate a component file (.tsx) alongside a story file (.stories.tsx).",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "What is the component name?",
            },
            {
                type: "list",
                name: "type",
                message: "What type of component is this?",
                choices: ["atoms", "molecules"],
            },
            {
                type: "confirm",
                name: "forwardRef?",
                message: "Setup as a forwardRef component?",
            },
        ],
        actions: (answers) => {
            const actions = [
                {
                    type: "add",
                    path: "./src/{{type}}/{{pascalCase name}}/index.tsx",
                    templateFile: "./templates/component-index.hbs",
                },
                {
                    type: "add",
                    path: "./src/{{type}}/{{pascalCase name}}/{{pascalCase name}}.types.ts",
                    templateFile: "./templates/component-types.hbs",
                },
                {
                    type: "add",
                    path: "./src/{{type}}/{{pascalCase name}}/{{pascalCase name}}.stories.tsx",
                    templateFile: "./templates/component-story.hbs",
                },
            ];

            if (answers) {
                if (answers["forwardRef?"]) {
                    actions.push({
                        type: "add",
                        path: "./src/{{type}}/{{pascalCase name}}/{{pascalCase name}}.tsx",
                        templateFile: "./templates/component-forwardref.hbs",
                    });
                } else {
                    actions.push({
                        type: "add",
                        path: "./src/{{type}}/{{pascalCase name}}/{{pascalCase name}}.tsx",
                        templateFile: "./templates/component.hbs",
                    });
                }
            }

            return actions;
        },
    });
}
