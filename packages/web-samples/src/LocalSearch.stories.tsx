import FlexMessageJSON from "@ohmyteeth/line-flex-message-renderer-sample-fixtures/fixtures/local-search.json" with { type: "json" };
import { FlexMessageRenderer } from "@ohmyteeth/react-line-flex-message-renderer";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "FlexMessage/LocalSearch",
  component: FlexMessageRenderer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    json: {
      description: "A JSON string representing the Flex Message to be rendered.",
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof FlexMessageRenderer>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    json: JSON.stringify(FlexMessageJSON, null, 2),
  },
  render: (args) => <FlexMessageRenderer {...args} />,
  play: async ({ canvasElement }) => {
    const { expect } = await import("vitest");

    await expect(canvasElement).toMatchScreenshot("local-search-rendered");
  },
};
