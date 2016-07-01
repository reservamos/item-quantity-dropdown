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

  plugins: [],

  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  }
};

if (environment === 'production') {
  config.output.filename = `${pluginName}.min.js`;
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin(`${pluginName}.min.css`)
  );
} else {
  config.output.filename = `${pluginName}.js`;
  config.plugins.push(
    new HtmlWebpackPlugin({ template: 'test/index.html' }),
    new ExtractTextPlugin(`${pluginName}.css`)
  );
  config.devServer = { host: '0.0.0.0' };
}

module.exports = config;
