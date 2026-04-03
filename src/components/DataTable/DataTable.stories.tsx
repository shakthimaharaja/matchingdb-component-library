import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DataTable from "./DataTable";
import type { DataTableColumn } from "./DataTable";

interface SampleRow {
  id: string;
  name: string;
  role: string;
  match: number;
  location: string;
}

const sampleData: SampleRow[] = [
  {
    id: "1",
    name: "Alice Johnson",
    role: "Frontend Developer",
    match: 92,
    location: "Remote",
  },
  {
    id: "2",
    name: "Bob Smith",
    role: "Backend Engineer",
    match: 78,
    location: "New York",
  },
  {
    id: "3",
    name: "Carol Davis",
    role: "Full-Stack Dev",
    match: 65,
    location: "Chicago",
  },
  {
    id: "4",
    name: "Dan Wilson",
    role: "DevOps Engineer",
    match: 45,
    location: "Austin",
  },
  {
    id: "5",
    name: "Eve Martinez",
    role: "Data Engineer",
    match: 88,
    location: "Remote",
  },
  {
    id: "6",
    name: "Frank Lee",
    role: "ML Engineer",
    match: 71,
    location: "SF",
  },
  {
    id: "7",
    name: "Grace Kim",
    role: "Product Manager",
    match: 33,
    location: "Seattle",
  },
  {
    id: "8",
    name: "Hank Brown",
    role: "QA Engineer",
    match: 56,
    location: "Denver",
  },
];

const columns: DataTableColumn<SampleRow>[] = [
  { key: "name", header: "Name", render: (r) => r.name, width: "30%" },
  { key: "role", header: "Role", render: (r) => r.role, width: "30%" },
  {
    key: "match",
    header: "Match %",
    render: (r) => `${r.match}%`,
    width: "15%",
    align: "center",
  },
  {
    key: "location",
    header: "Location",
    render: (r) => r.location,
    width: "25%",
  },
];

const meta: Meta<typeof DataTable<SampleRow>> = {
  title: "Compound/DataTable",
  component: DataTable,
  argTypes: {
    loading: { control: "boolean" },
    showSerialNumber: { control: "boolean" },
    paginated: { control: "boolean" },
    pageSize: { control: "select", options: [10, 25, 50, 100] },
    denseMode: { control: "boolean" },
    searchable: { control: "boolean" },
    selectable: { control: "boolean" },
    scrollableColumns: { control: "boolean" },
    stickyHeader: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof DataTable<SampleRow>>;

export const Default: Story = {
  args: {
    columns,
    data: sampleData,
    keyExtractor: (r) => r.id,
    title: "Candidates",
    titleIcon: "👤",
  },
};

export const Loading: Story = {
  args: {
    columns,
    data: [],
    keyExtractor: (r) => r.id,
    loading: true,
    title: "Loading…",
    titleIcon: "⏳",
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    keyExtractor: (r) => r.id,
    title: "No Results",
    emptyMessage: "No matching candidates found.",
  },
};

export const WithPagination: Story = {
  args: {
    columns,
    data: [
      ...sampleData,
      ...sampleData.map((r) => ({ ...r, id: `${r.id}-dup` })),
      ...sampleData.map((r) => ({ ...r, id: `${r.id}-dup2` })),
    ],
    keyExtractor: (r) => r.id,
    paginated: true,
    pageSize: 10,
    title: "Paginated Table",
    titleIcon: "📄",
  },
};

export const WithAlerts: Story = {
  args: {
    columns,
    data: sampleData.slice(0, 3),
    keyExtractor: (r) => r.id,
    title: "With Alerts",
    alertSuccess: "Profile updated successfully!",
    alertError: null,
  },
};

export const NoRowNumbers: Story = {
  args: {
    columns,
    data: sampleData.slice(0, 4),
    keyExtractor: (r) => r.id,
    showSerialNumber: false,
    title: "No Row Numbers",
  },
};

export const WithDownload: Story = {
  args: {
    columns,
    data: sampleData,
    keyExtractor: (r) => r.id,
    title: "Exportable",
    titleIcon: "📊",
    onDownload: () => alert("Download CSV triggered"),
    downloadLabel: "Export CSV",
  },
};

export const DenseMode: Story = {
  args: {
    columns,
    data: sampleData,
    keyExtractor: (r) => r.id,
    denseMode: true,
    title: "Dense Mode",
    titleIcon: "📐",
  },
};

export const Searchable: Story = {
  args: {
    columns,
    data: [
      ...sampleData,
      ...sampleData.map((r) => ({ ...r, id: `${r.id}-dup` })),
    ],
    keyExtractor: (r) => r.id,
    searchable: true,
    searchPlaceholder: "Search candidates...",
    paginated: true,
    pageSize: 10,
    title: "Searchable Table",
    titleIcon: "🔍",
  },
};

export const Selectable: Story = {
  args: {
    columns,
    data: sampleData,
    keyExtractor: (r) => r.id,
    selectable: true,
    onSelectionChange: (rows) => console.log("Selected:", rows),
    title: "Selectable Rows",
    titleIcon: "☑️",
  },
};

export const ScrollableColumns: Story = {
  args: {
    columns: [
      ...columns,
      {
        key: "dept",
        header: "Department",
        render: (r) => "Engineering",
        width: "200px",
      },
      {
        key: "start",
        header: "Start Date",
        render: (r) => "2024-01-15",
        width: "150px",
      },
      {
        key: "salary",
        header: "Salary",
        render: (r) => "$120,000",
        width: "150px",
        align: "right" as const,
      },
      {
        key: "status",
        header: "Status",
        render: (r) => "Active",
        width: "120px",
      },
    ],
    data: sampleData,
    keyExtractor: (r) => r.id,
    scrollableColumns: true,
    maxTableWidth: 600,
    title: "Horizontal Scroll",
    titleIcon: "↔️",
  },
};

export const FullFeatured: Story = {
  args: {
    columns,
    data: [
      ...sampleData,
      ...sampleData.map((r) => ({ ...r, id: `${r.id}-dup` })),
      ...sampleData.map((r) => ({ ...r, id: `${r.id}-dup2` })),
    ],
    keyExtractor: (r) => r.id,
    paginated: true,
    pageSize: 10,
    searchable: true,
    searchPlaceholder: "Search...",
    selectable: true,
    denseMode: true,
    serialNumberColumnWidth: 50,
    title: "Full Featured",
    titleIcon: "⭐",
    onDownload: () => alert("Download triggered"),
    downloadLabel: "Export",
  },
};
