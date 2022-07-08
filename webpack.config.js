var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: [
    'babel-polyfill',
    './app/app-js/obs_joined',
  ],
  output: {
    path: __dirname + '/app/assets/obs_joined',
    filename: 'obs_joined.js'
  },
  module: {
    rules: [
      {
        include: path.join(__dirname, 'app-js'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
