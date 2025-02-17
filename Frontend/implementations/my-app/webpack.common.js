// my-app/webpack.common.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/app/page.tsx',
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Pixel Streaming',
        template: './src/index.html',
        filename: 'index.html',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.html$/i,
          use: 'html-loader',
        },
        {
          test: /\.css$/,
          type: 'asset/resource',
          generator: {
            filename: 'css/[name][ext]',
          },
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name][ext]',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.svg', '.json'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'src'),
      },
  };