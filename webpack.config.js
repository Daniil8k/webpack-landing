const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = !isDevelopment;

module.exports = {
	context: path.resolve(__dirname, "src"),
	mode: isProduction ? "production" : "development",
	entry: { primary: "./primary.js", app: "./app.js" },
	output: {
		filename: "[name].[contenthash].bundle.js",
		path: path.resolve(__dirname, "dist"),
		clean: isProduction,
		assetModuleFilename: "[name].[contenthash][ext]",
	},
	resolve: {
		extensions: [".js", ".json", ".png"],
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	optimization: {
		splitChunks: {
			chunks: "all",
		},
		minimize: isProduction,
		minimizer: [new TerserPlugin()],
	},
	devtool: isDevelopment && "source-map",
	devServer: {
		port: 4200,
		hot: isProduction,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./index.hbs",
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
				test: /\.hbs$/,
				use: [
					{
						loader:
							"handlebars-loader?" +
							JSON.stringify({ inlineRequires: "/assets/" }),
					},
				],
			},
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
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader",
					"sass-loader",
				],
			},
			{
				test: /\.(ttf|woff|woff2)$/,
				type: "asset/resource",
			},
			{
				test: /\.(jpg|png|gif|svg)$/i,
				type: "asset/resource",
				use: [
					{
						loader: "image-webpack-loader",
						options: {
							mozjpeg: {
								progressive: true,
							},
							optipng: {
								enabled: false,
							},
							pngquant: {
								quality: [0.65, 0.9],
								speed: 4,
							},
							gifsicle: {
								interlaced: false,
							},
							webp: {
								quality: 75,
							},
						},
					},
				],
			},
		],
	},
};
