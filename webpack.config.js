// const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const autoprefixerPlugin = require('autoprefixer');

const devMode = process.env.NODE_ENV === 'development';
const pluginName = 'item-quantity-dropdown';

const config = {
  mode: process.env.NODE_ENV,

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: devMode ? `${pluginName}.js` : `${pluginName}.min.js`,
    library: pluginName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },

  module: {
    rules: [
      {
        // ESLint
        enforce: 'pre',
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'eslint-loader',
      },
      {
        // JS
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        // Expose jQuery
        test: /jquery\.js$/,
        include: path.resolve(__dirname, 'node_modules/jquery/dist'),
        loader: 'expose-loader?jQuery!expose-loader?$',
      },
      {
        // CSS / SASS
        test: /\.s?css$/,
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixerPlugin],
              sourceMap: true,
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [path.resolve(__dirname, 'src')],
            },
          },
        ],
      },
      {
        // Ship Images
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: 'url-loader',
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `${pluginName}.min.css`,
    }),
    new StyleLintPlugin({
      configFile: path.resolve(__dirname, '.stylelintrc.json'),
      context: path.resolve(__dirname, 'src'),
    }),
  ],

  resolve: {
    extensions: ['.js', '.css', '.scss'],
    modules: ['src', 'node_modules'],
  },

  devtool: 'source-map',
};

if (devMode) {
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: 'test/index.html',
    }),
  );
  config.devServer = { host: '0.0.0.0' };
}

module.exports = config;
