var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

var env = process.env.NODE_ENV;
var pluginName = 'item-quantity-dropdown';
var plugins = [new ExtractTextPlugin(pluginName + '.css')];
var devtool = '';
var outputFile;

if (env === 'production') {
  outputFile = `${pluginName}.min.js`;
  plugins.push(new webpack.optimize.UglifyJsPlugin());
} else {
  outputFile = `${pluginName}.js`;
  devtool = '#source-map';
  plugins.push(new HtmlWebpackPlugin({ template: 'test/index.html' }));
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
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style',
          ['css', 'postcss', 'resolve-url', 'sass']
        ),
        include: [path.resolve(__dirname, 'src')]
      }
    ]
  },
  
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],

  sassLoader: {
    includePaths: [
      path.resolve(__dirname, 'src')
    ]
  },

  plugins: plugins,

  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  }
};

module.exports = config;
