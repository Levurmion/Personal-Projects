import { Meta, StoryObj } from "@storybook/react";
import Text from ".";

const meta = {
    tags: ["autodocs"],
    title: "Styles/Text",
    parameters: {
        layout: ["centered"],
    },
} satisfies Meta;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const Story = () => (
    <div className="flex flex-col items-center gap-4">
        <Text.h1>Header 1</Text.h1>
        <Text.h2>Header 2</Text.h2>
        <Text.h3>Header 3</Text.h3>
        <Text.h4>Header 4</Text.h4>
        <Text.p>paragraph or regular text</Text.p>
    </div>
);
