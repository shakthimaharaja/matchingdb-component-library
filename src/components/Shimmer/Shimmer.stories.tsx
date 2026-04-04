import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Shimmer from "./Shimmer";

const meta: Meta<typeof Shimmer> = {
  title: "Atomic/Shimmer",
  component: Shimmer,
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Shimmer>;

export const Default: Story = {
  args: { size: "sm" },
};

export const Large: Story = {
  args: { size: "lg" },
};

export const SkeletonRow: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Shimmer size="xs" />
      <Shimmer size="lg" />
      <Shimmer size="md" />
      <Shimmer size="sm" />
    </div>
  ),
};
