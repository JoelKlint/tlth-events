var webpack = require('webpack');
var path = require('path');
require('dotenv').config()

module.exports = {
	entry: [
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server',
		'./views/index.jsx'
	],
	output: {
		path: 'views',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.(jsx|js)$/,
				loaders: ['react-hot', 'babel'],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loaders: ['style', 'css']
			},
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
			'/api/*': 'http://localhost:' + process.env.PORT
		}
	}
}
