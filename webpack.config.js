const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`)

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: ['./assets/scripts/index.ts', './assets/styles/style.css'],
    output: {
        filename: filename('.js'),
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    devServer: {
        port: 8080,
        hot: isDev,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd,
            },
        }),
        new CleanWebpackPlugin(),
    ],
}
