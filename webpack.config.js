var webpack = require('webpack');

module.exports = {
	entry: [
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server',
		'./views/index.jsx'
	],
	output: {
		path: 'public',
		filename: 'index.js'
	},
	module: {
		loaders: [
			{
				loaders: ['react-hot', 'babel'],
				exclude: '/node_modules/'
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
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
		contentBase: './public'
	}
}
