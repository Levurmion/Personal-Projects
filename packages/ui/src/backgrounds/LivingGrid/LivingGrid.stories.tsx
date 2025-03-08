import { Meta, StoryObj } from "@storybook/react";
import { LivingGrid } from "./LivingGrid";

const meta = {
    tags: ["autodocs"],
    title: "Backgrounds/Living Grid",
    component: LivingGrid,
} satisfies Meta<typeof LivingGrid>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const DefaultGrid = () => (
    <div className="h-[100vh] w-[100vw]">
        <LivingGrid
            className="bg-gray-400"
            renderDot={() => <circle r={"5"} className="fill-gray-600" />}
        />
    </div>
);
