var webpack = require('webpack');
var path = require('path');
var merge = require('webpack-merge')

var client = {
  entry: [
    './views/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
    ]
  }
}

var server = {
  target: 'node',
  entry: [
    './server/serverRenderer.jsx'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'serverRenderer.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: 'css'
      }
    ]
  }
}

var common = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
}

module.exports = [ merge(client, common), merge(server, common) ];
