import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Toolbar from "./Toolbar";

const meta: Meta<typeof Toolbar> = {
  title: "Compound/Toolbar",
  component: Toolbar,
};
export default meta;

type Story = StoryObj<typeof Toolbar>;

export const Default: Story = {
  args: {
    left: <span>🔍 Filter results</span>,
    right: <button>Export</button>,
  },
};

export const WithChildren: Story = {
  args: {
    left: <strong>Candidates</strong>,
    children: <span style={{ fontSize: 12, opacity: 0.7 }}>42 results</span>,
    right: <button>Download CSV</button>,
  },
};

export const LeftOnly: Story = {
  args: {
    left: <span>Dashboard Controls</span>,
  },
};
