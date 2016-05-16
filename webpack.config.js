var webpack = require('webpack');
var path = require('path');
var merge = require('webpack-merge');

var TARGET = process.env.npm_lifecycle_event;

var client = {
	entry: [
		'./views/index.jsx'
	],
	output: {
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

if(TARGET === 'dev') {
	client = merge(client, {
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
					exclude: /node_modules/
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
	client = merge(client, {
		output: {
			path: path.join(__dirname, 'public')
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production')
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: { warnings: false }
			}),
			new webpack.optimize.OccurrenceOrderPlugin()
		]
	})
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
	},
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

module.exports = [ client, server ];
