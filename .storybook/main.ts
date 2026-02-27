/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: "ts-loader",
      exclude: /node_modules/,
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
};
export default config;
