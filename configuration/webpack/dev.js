const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
// const BundleAnalyzerPlugin = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
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
      new BundleAnalyzerPlugin({
        // Can be `server`, `static` or `disabled`.
        // In `server` mode analyzer will start HTTP server to show bundle report.
        // In `static` mode single HTML file with bundle report will be generated.
        // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
        analyzerMode: 'server',
        // Host that will be used in `server` mode to start HTTP server.
        analyzerHost: '127.0.0.1',
        // Port that will be used in `server` mode to start HTTP server.
        analyzerPort: 8888,
        // Path to bundle report file that will be generated in `static` mode.
        // Relative to bundles output directory.
        reportFilename: 'report.html',
        // Module sizes to show in report by default.
        // Should be one of `stat`, `parsed` or `gzip`.
        // See "Definitions" section for more information.
        defaultSizes: 'parsed',
        // Automatically open report in default browser
        openAnalyzer: true,
        // If `true`, Webpack Stats JSON file will be generated in bundles output directory
        generateStatsFile: false,
        // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
        // Relative to bundles output directory.
        statsFilename: 'stats.json',
        // Options for `stats.toJson()` method.
        // For example you can exclude sources of your modules from stats file with `source: false` option.
        // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
        statsOptions: null,
        // Log level. Can be 'info', 'warn', 'error' or 'silent'.
        logLevel: 'info'
      }),
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
