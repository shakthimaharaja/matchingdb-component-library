import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Tabs from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Compound/Tabs",
  component: Tabs,
};
export default meta;

type Story = StoryObj<typeof Tabs>;

const sampleTabs = [
  { key: "overview", label: "Overview" },
  { key: "skills", label: "Skills" },
  { key: "experience", label: "Experience" },
  { key: "education", label: "Education" },
];

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState("overview");
    return (
      <div>
        <Tabs tabs={sampleTabs} activeKey={active} onSelect={setActive} />
        <div style={{ padding: 12, border: "1px solid #ccc" }}>
          Content for <strong>{active}</strong>
        </div>
      </div>
    );
  },
};

export const TwoTabs: Story = {
  render: () => {
    const [active, setActive] = useState("jobs");
    return (
      <Tabs
        tabs={[
          { key: "jobs", label: "💼 Jobs" },
          { key: "candidates", label: "👤 Candidates" },
        ]}
        activeKey={active}
        onSelect={setActive}
      />
    );
  },
};
