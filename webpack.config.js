var webpack = require('webpack');
var path = require('path');
var merge = require('webpack-merge');

var TARGET = process.env.npm_lifecycle_event;

var common = {
	entry: [
		'./views/index.jsx'
	],
	output: {
		path: 'public',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				loaders: ['babel'],
				exclude: '/node_modules/'
			}
		]
	}
}

if(TARGET === 'dev') {
	module.exports = merge(common, {
		entry: [
			'webpack-dev-server/client?http://localhost:8080',
			'webpack/hot/only-dev-server',
		],
		module: {
			loaders: [
				{
					loaders: ['react-hot'],
					exclude: '/node_modules'
				}
			]
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('development')
			}),
			new webpack.HotModuleReplacementPlugin()
		],
		devServer: {
			hot: true,
			inline: true,
			contentBase: path.resolve(__dirname, 'public')
		}
	})
}

if(TARGET === 'build') {
	module.exports = common;
}
