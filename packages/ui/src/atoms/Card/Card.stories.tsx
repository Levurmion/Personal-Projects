import { Meta, StoryObj } from "@storybook/react";
import Card from "./Card";

const meta = {
    tags: ["autodocs"],
    title: "Atoms/Card",
    component: Card,
    parameters: {
        layout: ["centered"],
    },
} satisfies Meta<typeof Card>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const Story = () => (
    <Card className="aspect-square w-[400px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi placerat, eros eu hendrerit
        lobortis, nisi sapien euismod urna, vitae ornare ante odio quis ex. Donec dictum diam ac
        ante sollicitudin vehicula. Vivamus eget ullamcorper augue, nec scelerisque ipsum. Proin et
        rutrum ipsum, vel placerat dui. Quisque eu diam tincidunt neque accumsan ultricies eget ac
        ex. Nam tempus interdum tortor at eleifend. Pellentesque pretium urna quis magna feugiat
        semper. Praesent pellentesque, nisi eget ornare auctor, massa nunc iaculis nulla, eu
        consequat libero justo sed justo. Class aptent taciti sociosqu ad litora torquent per
        conubia nostra, per inceptos himenaeos. Vestibulum id vulputate sapien.
    </Card>
);
