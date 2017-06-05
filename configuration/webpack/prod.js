const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');
const path = require('path');
const rootPath = path.join(__dirname, '../../');

module.exports = function(env) {
  return webpackMerge(commonConfig(), {
    output: {
      path: path.join(rootPath, 'build'),
      publicPath: 'http://comapp.org.s3-website-us-west-2.amazonaws.com/',
      filename: 'bundle.js',
      sourceMapFilename: 'debugging/[file].map',
      pathinfo: true
    },
    devtool: false,
    module: {
      rules: [
        {
          test: /\.css$/,
          include: [
            path.join(rootPath, "src"),
            path.join(rootPath, "node_modules/react-spinkit"),
            path.join(rootPath, "node_modules/normalize.css"),
            path.join(rootPath, "node_modules/bulma"),
          ],
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader']
          })
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'resolve-url-loader', 'sass-loader']
          })
        },
        {
          test: /\.(jpg|jpeg|png|svg|json)$/,
          include: [
            path.join(rootPath, "src/common"),
            path.join(rootPath, "src/modules/landing/jsons"),
          ],
          use: 'file-loader'
        },
        {
          test: /\.(js|jsx)$/,
          include: [
            path.join(rootPath, "src")
          ],
          loader: 'babel-loader',
          query: {
            presets: [['es2015', {modules: false}], 'react']
          }
        }
      ],
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production'),
          'API_ENDPOINT': JSON.stringify("http://pp-api-staging.us-west-2.elasticbeanstalk.com"),
          'CLOUDSEARCH_ENDPOINT': JSON.stringify("https://lytlo6bx8e.execute-api.us-west-2.amazonaws.com/production/cloudsearch")
        }
      }),
      new ExtractTextPlugin('styles.css'),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          join_vars: true,
          if_return: true
        },
        comments: false
      })
    ]
  });
};
