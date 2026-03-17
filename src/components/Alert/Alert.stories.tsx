import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Alert from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Atomic/Alert",
  component: Alert,
  argTypes: {
    variant: { control: "select", options: ["success", "error"] },
  },
};
export default meta;

type Story = StoryObj<typeof Alert>;

export const Success: Story = {
  args: { variant: "success", children: "Operation completed successfully." },
};

export const Error: Story = {
  args: { variant: "error", children: "Something went wrong. Please retry." },
};

export const LongMessage: Story = {
  args: {
    variant: "error",
    children:
      "Error: Failed to save candidate profile. The server returned a 500 status code. Please check your network connection and try again later.",
  },
};
