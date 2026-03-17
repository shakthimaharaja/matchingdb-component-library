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
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    inputWidth: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: "Enter text…" },
};

export const WithWidth: Story = {
  args: { placeholder: "Fixed width", inputWidth: 200 },
};

export const NumberInput: Story = {
  args: { type: "number", placeholder: "0", inputWidth: 80 },
};

export const Disabled: Story = {
  args: { placeholder: "Disabled", disabled: true },
};
