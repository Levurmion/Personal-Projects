import { Meta, StoryObj } from "@storybook/react"
import Card from "./Card"

const meta = {
    title: "Atoms/Card",
    component: Card,
    parameters: {
        layout: ["centered"]
    }
} satisfies Meta<typeof Card>

export default meta
type StoryType = StoryObj<typeof meta>

export const Story: StoryType = {

}