import type { StorybookConfig } from '@storybook/react-vite';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [{
    name: '@storybook/addon-docs',
    options: {
      mdxPluginOptions: {
        mdxCompileOptions: {
          remarkPlugins: [remarkGfm],
        },
      },
    },
  }, '@storybook/addon-a11y', '@storybook/addon-vitest', '@storybook/addon-mcp'],
  staticDirs: ['../public'],
  framework: '@storybook/react-vite',
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  viteFinal: async (config) => {
    // staticDirs already copies public/ into the build. Vite's own publicDir copy writes the same
    // files to the same place at the same time, and the race fails the build with EEXIST.
    config.publicDir = false;

    if (process.env.STORYBOOK_BASE_PATH) {
      config.base = process.env.STORYBOOK_BASE_PATH;
    }
    return config;
  },
};
export default config;
