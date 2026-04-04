import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";

const meta: Meta<typeof Input> = {
  title: "Atomic/Input",
  component: Input,
  argTypes: {
    type: {
      control: "select",
      options: ["text", "number", "email", "password", "search"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md"],
    },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: "Enter text…" },
};

export const Small: Story = {
  args: { placeholder: "Small input", size: "sm" },
};

export const ExtraSmall: Story = {
  args: { placeholder: "XS", size: "xs" },
};

export const FullWidth: Story = {
  args: { placeholder: "Full width", fullWidth: true },
};

export const Disabled: Story = {
  args: { placeholder: "Disabled", disabled: true },
};
