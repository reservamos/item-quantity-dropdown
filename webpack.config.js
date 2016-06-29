const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pluginName = 'item-quantity-dropdown';
const env = process.env.NODE_ENV;
var plugins = [];
var outputFile;
var devtool = '';

if (env === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
  outputFile = `${pluginName}.min.js`;
} else {
  devtool = '#source-map';
  plugins.push(new HtmlWebpackPlugin({ template: 'test/index.html' }));
  outputFile = `${pluginName}.js`;
}

const config = {
  entry: './src/index.js',
  devtool: devtool,
  output: {
    path: './lib',
    filename: outputFile,
    library: pluginName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel', 'eslint'],
        exclude: /node_modules/
      }, {
        test: /jquery\.js$/,
        loader: 'expose?jQuery'
      }
    ]
  },
  plugins: plugins,
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  }
};

module.exports = config;
