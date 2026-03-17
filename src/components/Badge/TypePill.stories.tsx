import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import TypePill from "./TypePill";

const meta: Meta<typeof TypePill> = {
  title: "Atomic/TypePill",
  component: TypePill,
  argTypes: {
    status: { control: "select", options: [undefined, "active", "closed"] },
  },
};
export default meta;

type Story = StoryObj<typeof TypePill>;

export const Default: Story = {
  args: { children: "Full-Time" },
};

export const Active: Story = {
  args: { children: "Active", status: "active" },
};

export const Closed: Story = {
  args: { children: "Closed", status: "closed" },
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <TypePill>No status</TypePill>
      <TypePill status="active">Active</TypePill>
      <TypePill status="closed">Closed</TypePill>
    </div>
  ),
};
