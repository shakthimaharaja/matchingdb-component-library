import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Shimmer from "./Shimmer";

const meta: Meta<typeof Shimmer> = {
  title: "Atomic/Shimmer",
  component: Shimmer,
  argTypes: {
    width: { control: { type: "range", min: 20, max: 300 } },
    height: { control: { type: "range", min: 5, max: 40 } },
  },
};
export default meta;

type Story = StoryObj<typeof Shimmer>;

export const Default: Story = {
  args: { width: 60, height: 10 },
};

export const Wide: Story = {
  args: { width: 200, height: 14 },
};

export const SkeletonRow: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Shimmer width={30} height={30} />
      <Shimmer width={120} height={12} />
      <Shimmer width={80} height={12} />
      <Shimmer width={60} height={12} />
    </div>
  ),
};
