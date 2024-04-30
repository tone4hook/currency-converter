const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { VueLoaderPlugin } = require('vue-loader');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const packageJson = require('./package.json');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  const publicPath = isProduction
    ? 'https://tone4hook.github.io/currency-converter/'
    : 'http://localhost:8081/';

  const currency_vista = isProduction
    ? 'currency_vista@https://tone4hook.github.io/currency_vista/remoteEntry.js'
    : 'currency_vista@http://localhost:8080/remoteEntry.js';

  return {
    output: {
      uniqueName: 'currency_converter',
      publicPath,
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.vue', '.jsx', '.js', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
    },

    devServer: {
      port: 8081,
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers':
          'X-Requested-With, content-type, Authorization',
      },
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
        {
          test: /\.(png|jpe?g|gif|svg|ico)$/i,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      ],
    }, // Add a comma here

    plugins: [
      new VueLoaderPlugin(),
      new ModuleFederationPlugin({
        name: 'currency_converter',
        filename: 'remoteEntry.js',
        remotes: {
          currency_vista,
        },
        exposes: {
          './Currency': './src/pages/Currency.vue',
          './CurrencyStore': './src/stores/currency',
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
