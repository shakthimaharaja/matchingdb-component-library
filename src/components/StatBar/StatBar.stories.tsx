import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import StatBar from "./StatBar";
import type { StatItem } from "./StatBar";

const meta: Meta<typeof StatBar> = {
  title: "Compound/StatBar",
  component: StatBar,
};
export default meta;

type Story = StoryObj<typeof StatBar>;

const sampleStats: StatItem[] = [
  { key: "total", icon: "📊", value: 128, label: "Total Jobs", active: true },
  { key: "matched", icon: "✅", value: 42, label: "Matched" },
  { key: "poked", icon: "👉", value: 15, label: "Poked" },
  { key: "applied", icon: "📧", value: 7, label: "Applied" },
];

export const Default: Story = {
  args: { stats: sampleStats },
};

export const WithClickHandler: Story = {
  args: {
    stats: sampleStats,
    onSelect: (key: string) => alert(`Selected: ${key}`),
  },
};

export const WithSubStats: Story = {
  args: {
    stats: [
      {
        key: "revenue",
        icon: "💰",
        value: "$124K",
        label: "Revenue",
        active: true,
      },
      { key: "hours", icon: "⏱", value: "1,240", label: "Hours" },
      { key: "avg", icon: "📈", value: "$65/hr", label: "Avg Rate", sub: true },
      { key: "margin", icon: "📊", value: "22%", label: "Margin", sub: true },
    ],
  },
};
