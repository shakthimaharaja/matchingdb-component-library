import React from "react";
import type { Preview } from "@storybook/react";
import "../src/styles/w97-theme.css";
import "../src/styles/w97-base.css";

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
};
export default preview;
