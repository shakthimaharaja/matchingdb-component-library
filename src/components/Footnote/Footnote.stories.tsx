import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Footnote, { FootnoteSep } from "./Footnote";

const meta: Meta<typeof Footnote> = {
  title: "Atomic/Footnote",
  component: Footnote,
};
export default meta;

type Story = StoryObj<typeof Footnote>;

export const Default: Story = {
  args: { children: "Last updated 5 minutes ago" },
};

export const WithSeparators: Story = {
  render: () => (
    <Footnote>
      <span>42 results</span>
      <FootnoteSep />
      <span>Page 1 of 5</span>
      <FootnoteSep />
      <span>Showing 10 per page</span>
    </Footnote>
  ),
};

export const StatusLine: Story = {
  render: () => (
    <Footnote>
      <span>✅ Synced</span>
      <FootnoteSep />
      <span>Last sync: 2 min ago</span>
    </Footnote>
  ),
};
