var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var path = require('path');


var config = {
	entry: {
		'polyfills': './lib/web/app/polyfills.ts',
		'vendor': './lib/web/app/vendors.ts',
		'app': './lib/web/app/main.ts'
	},
  	devtool: "source-map",
	output: {
		path: __dirname + "/lib/web/public/",
		filename: "js/[name].[hash].js",
		publicPath: "/"
	},
	resolve: {
		extensions: ['', '.js', '.ts'],
		modules: ['node_modules']
	},
	module: {
		loaders: [{
			test: /\.ts$/,
			loaders: ['ts', 'angular2-template-loader']
		}, {
			test: /\.html$/,
			loaders: ['raw', 'html-minify-loader']
		},
		 {
            test: /\.(css)$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
            include: [path.resolve(__dirname, "node_modules")]
        },
		{
			test: /\.(scss)$/,
			loader: 'raw!postcss!sass'
		}, {
			test: /\.json$/,
			loader: 'json'
		}, {
			test: /\.(jpg|png|ico)$/,
			loader: 'file?name=images/[name].[ext]'
		}, {
			test: /\.(eot|ttf|woff)$/,
			loader: 'file?name=fonts/[name].[ext]'
		},
		{
			test: /\.(svg)$/,
			loader: 'url-loader?limit=100000'
		}]
	},
	'html-minify-loader': {
		empty: true,
		cdata: true,
		comments: false,
		quotes: true,
		dom: {
			lowerCaseAttributeNames: false
		}
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'vendor', 'polyfills']
		}),
		new HtmlWebpackPlugin({
			template: './lib/templates/web/index.wp.hbs',
			filename: __dirname + '/lib/templates/index.hbs'
		}),
		new ProvidePlugin({
			"JSONEditor": 'jsoneditor',
			"window.JSONEditor": 'jsoneditor'
		}),
        new ExtractTextPlugin("css/[name].[hash].css")
	]
};

//production only config
if (process.env.NODE_ENV !== "dev") {
	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			mangle: false,
			compress: {
				warnings: false
			}
		}));
}

module.exports = config;