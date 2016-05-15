var webpack = require('webpack');
var path = require('path');
var merge = require('webpack-merge');

var TARGET = process.env.npm_lifecycle_event;

var common = {
	entry: [
		'./views/index.jsx'
	],
	output: {
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				loader: 'babel',
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
		output: {
			path: 'views'
		},
		module: {
			loaders: [
				{
					loader: 'react-hot',
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
			contentBase: path.resolve(__dirname, 'views'),
			proxy: {
				'/api/*': 'http://localhost:3000'
			}
		}
	})
}

if(TARGET === 'build') {
	module.exports = merge(common, {
		output: {
			path: 'public'
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production')
			}),
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.optimize.OccurrenceOrderPlugin()
		]
	})
}
