import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Panel from "./Panel";

const meta: Meta<typeof Panel> = {
  title: "Compound/Panel",
  component: Panel,
  argTypes: {
    title: { control: "text" },
    titleIcon: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Panel>;

export const Default: Story = {
  args: {
    title: "Candidate Details",
    titleIcon: "👤",
    children: <p style={{ padding: 12 }}>Panel body content goes here.</p>,
  },
};

export const WithMeta: Story = {
  args: {
    title: "Job Openings",
    titleIcon: "💼",
    titleMeta: <span style={{ fontSize: 12, opacity: 0.7 }}>42 results</span>,
    children: <p style={{ padding: 12 }}>Table or list content.</p>,
  },
};

export const NoTitle: Story = {
  args: {
    children: <p style={{ padding: 12 }}>Panel without a title bar.</p>,
  },
};

export const WithTitleExtra: Story = {
  args: {
    title: "Financials",
    titleIcon: "💰",
    titleExtra: <span style={{ fontSize: 11, color: "green" }}>▲ +12%</span>,
    titleMeta: <button>Export</button>,
    children: <p style={{ padding: 12 }}>Financial summary content.</p>,
  },
};
