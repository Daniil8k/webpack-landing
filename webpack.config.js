const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = !isDevelopment;

module.exports = {
	context: path.resolve(__dirname, "src"),
	mode: "development",
	entry: "./app.js",
	output: {
		filename: "[name].[contenthash].bundle.js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
		assetModuleFilename: "[name].[contenthash][ext]",
	},
	resolve: {
		extensions: [".js", ".json", ".png"],
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	devtool: isDevelopment && "source-map",
	devServer: {
		port: 4200,
		hot: isDevelopment,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./index.html",
			minify: { collapseWhitespace: isProduction },
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "src/favicon.ico"),
					to: path.resolve(__dirname, "dist"),
				},
			],
		}),
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css",
			chunkFilename: "[name].[contenthash].css",
		}),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
			{
				test: /\.(css|scss|sass)$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
		],
	},
};
