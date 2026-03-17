import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import FilterBar from "./FilterBar";

const meta: Meta<typeof FilterBar> = {
  title: "Compound/FilterBar",
  component: FilterBar,
};
export default meta;

type Story = StoryObj<typeof FilterBar>;

export const Default: Story = {
  args: {
    children: (
      <>
        <input placeholder="Search…" className="matchdb-input" />
        <select className="matchdb-select">
          <option>All Types</option>
          <option>Full-Time</option>
          <option>Part-Time</option>
        </select>
        <button className="matchdb-btn matchdb-btn-primary">Apply</button>
      </>
    ),
  },
};

export const WithMultipleFilters: Story = {
  args: {
    children: (
      <>
        <input placeholder="Job title…" className="matchdb-input" />
        <select className="matchdb-select">
          <option>All Locations</option>
          <option>Remote</option>
          <option>On-site</option>
        </select>
        <select className="matchdb-select">
          <option>All Skills</option>
          <option>React</option>
          <option>Node.js</option>
        </select>
        <button className="matchdb-btn matchdb-btn-primary">Search</button>
      </>
    ),
  },
};
