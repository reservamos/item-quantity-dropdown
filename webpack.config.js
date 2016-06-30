var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

var environment = process.env.NODE_ENV;
var pluginName = 'item-quantity-dropdown';
var outputFile;

var config = {
  entry: './src/index.js',

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

  plugins: [new ExtractTextPlugin(pluginName + '.css')],

  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  }
};

if (environment === 'production') {
  config.outputFile = `${pluginName}.min.js`;
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
} else {
  config.outputFile = `${pluginName}.js`;
  config.devtool = '#source-map';
  config.plugins.push(new HtmlWebpackPlugin({ template: 'test/index.html' }));
  config.devServer = { host: '0.0.0.0' };
}

module.exports = config;
