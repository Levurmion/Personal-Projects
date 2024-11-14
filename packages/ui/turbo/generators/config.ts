import type { PlopTypes } from "@turbo/gen";

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
        ],
        actions: [
            {
                type: "add",
                path: "./src/{{type}}/{{pascalCase name}}/{{pascalCase name}}.tsx",
                templateFile: "./templates/component.hbs",
            },
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
        ],
    });
}
