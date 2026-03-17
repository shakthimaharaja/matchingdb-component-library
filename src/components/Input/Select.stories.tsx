import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Select from "./Select";

const meta: Meta<typeof Select> = {
  title: "Atomic/Select",
  component: Select,
  argTypes: {
    disabled: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    children: (
      <>
        <option value="">— Select —</option>
        <option value="ft">Full-Time</option>
        <option value="pt">Part-Time</option>
        <option value="c2c">Corp-to-Corp</option>
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <option value="">Disabled</option>
      </>
    ),
  },
};
