import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import MatchMeter from "./MatchMeter";

const meta: Meta<typeof MatchMeter> = {
  title: "Atomic/MatchMeter",
  component: MatchMeter,
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    variant: { control: "select", options: ["default", "high", "mid", "low"] },
    label: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof MatchMeter>;

export const High: Story = {
  args: { value: 85, label: "85%" },
};

export const Mid: Story = {
  args: { value: 55, label: "55%" },
};

export const Low: Story = {
  args: { value: 25, label: "25%" },
};

export const Zero: Story = {
  args: { value: 0, label: "0%" },
};

export const Full: Story = {
  args: { value: 100, label: "100%" },
};

export const AllRanges: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 12, width: 300 }}
    >
      <MatchMeter value={90} label="90% — high" />
      <MatchMeter value={60} label="60% — mid" />
      <MatchMeter value={20} label="20% — low" />
    </div>
  ),
};
