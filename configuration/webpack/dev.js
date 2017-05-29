const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');
const path = require('path');
const root = path.join(__dirname, '../../');

module.exports = function(env) {
  return webpackMerge(commonConfig(), {
    devtool: 'eval',
    output: {
      path: path.join(root, 'build'),
      publicPath: '/',
      filename: 'bundle.js',
      sourceMapFilename: 'debugging/[file].map'
    },
    devServer: {
      port: 9000,
      host: '0.0.0.0',
      historyApiFallback: true,
      noInfo: false,
      stats: 'minimal',
      publicPath: '/' 
    },
    module: {
      rules: [
        {
          test: /\.(jpg|jpeg|png|svg|json)$/,
          include: [
            path.join(root, "src/common"),
            path.join(root, "src/modules/landing/jsons"),
          ],
          use: 'file-loader'
        },
        {
          test: /\.css$/,
          include: [
            path.join(root, 'src'),
            path.join(root, 'node_modules')
          ],
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'resolve-url-loader'
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'style-loader'
            }, 
            {
              loader: 'css-loader'
            },
            {
              loader: 'resolve-url-loader'
            }, 
            {
              loader: 'sass-loader'
            }
          ]
        },
        {
          test: /\.(js|jsx)$/,
          include: [
            path.join(root, "src")
          ],
          use: [
            'babel-loader'
          ]
        }
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development'),
          'API_ENDPOINT': JSON.stringify("http://pp-api-staging.us-west-2.elasticbeanstalk.com"),
          'TILE_ENDPOINT': JSON.stringify("http://pp-tiles-production.us-west-2.elasticbeanstalk.com"),
          'CLOUDSEARCH_ENDPOINT': JSON.stringify("https://lytlo6bx8e.execute-api.us-west-2.amazonaws.com/production/cloudsearch")
        }
      })
    ]
  });
};
