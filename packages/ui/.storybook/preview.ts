import type { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";
import "../src/styles.css";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        docs: {
            theme: themes.light,
        },
        layout: "fullscreen",
    },
};

export default preview;
