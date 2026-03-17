import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Atomic/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "primary",
        "poke",
        "email",
        "expand",
        "download",
        "close",
        "reopen",
        "matches",
      ],
    },
    size: { control: "select", options: ["xs", "sm", "md"] },
    disabled: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: "Default", variant: "default", size: "md" },
};

export const Primary: Story = {
  args: { children: "Primary", variant: "primary", size: "md" },
};

export const Poke: Story = {
  args: { children: "👉 Poke", variant: "poke", size: "md" },
};

export const Email: Story = {
  args: { children: "✉ Email", variant: "email", size: "md" },
};

export const Expand: Story = {
  args: { children: "Expand", variant: "expand", size: "sm" },
};

export const Download: Story = {
  args: { children: "⬇ Download", variant: "download", size: "md" },
};

export const Close: Story = {
  args: { children: "Close", variant: "close", size: "md" },
};

export const Reopen: Story = {
  args: { children: "Reopen", variant: "reopen", size: "md" },
};

export const Matches: Story = {
  args: { children: "Matches", variant: "matches", size: "md" },
};

export const Small: Story = {
  args: { children: "Small", variant: "primary", size: "sm" },
};

export const ExtraSmall: Story = {
  args: { children: "XS", variant: "primary", size: "xs" },
};

export const Disabled: Story = {
  args: { children: "Disabled", variant: "primary", disabled: true },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {(
        [
          "default",
          "primary",
          "poke",
          "email",
          "expand",
          "download",
          "close",
          "reopen",
          "matches",
        ] as const
      ).map((v) => (
        <Button key={v} variant={v}>
          {v}
        </Button>
      ))}
    </div>
  ),
};
