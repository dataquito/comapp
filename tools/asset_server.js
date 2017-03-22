import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../configuration/webpack/webpack.config';
import open from 'open';

/* eslint-disable no-console */

const port = 9000;
const app = express();
const compiler = webpack(config('dev'));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: '/'
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
