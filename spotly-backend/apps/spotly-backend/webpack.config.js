/* eslint-disable @typescript-eslint/no-require-imports */
const { composePlugins, withNx } = require('@nx/webpack');
const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const path = require('path');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
  config.output.devtoolModuleFilenameTemplate = (info) =>
    `webpack:///./${path.relative(process.cwd(), info.absoluteResourcePath)}`;

  config.plugins = [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    }),
  ];

  // Enable watch options for hot reload
  config.watchOptions = {
    ignored: /node_modules/,
    poll: 1000,
    aggregateTimeout: 300,
  };

  return config;
});
