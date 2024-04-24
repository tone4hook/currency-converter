const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { VueLoaderPlugin } = require('vue-loader');
const Dotenv = require('dotenv-webpack');
const packageJson = require('./package.json');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  const publicPath = isProduction
    ? 'https://tone4hook.github.io/currency-converter/'
    : 'http://localhost:8081/';

  return {
    output: {
      publicPath,
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.vue', '.jsx', '.js', '.json'],
    },

    devServer: {
      port: 8081,
      historyApiFallback: true,
    },

    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.tsx?$/,
          use: [
            'babel-loader',
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                appendTsSuffixTo: ['\\.vue$'],
                happyPackMode: true,
              },
            },
          ],
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        },
      ],
    }, // Add a comma here

    plugins: [
      new VueLoaderPlugin(),
      new ModuleFederationPlugin({
        name: 'currency_converter',
        filename: 'remoteEntry.js',
        remotes: {},
        exposes: {
          './Currency': './src/pages/Currency.vue',
        },
        shared: packageJson.dependencies,
      }),
      new HtmlWebPackPlugin({
        template: './src/index.html',
      }),
      new Dotenv(),
    ],
  };
};
