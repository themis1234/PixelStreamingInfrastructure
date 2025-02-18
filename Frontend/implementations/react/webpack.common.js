// Copyright Epic Games, Inc. All Rights Reserved.

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

const pages = fs.readdirSync('./src', { withFileTypes: true })
  .filter(item => !item.isDirectory())
  .filter(item => path.parse(item.name).ext === '.html')
  .map(htmlFile => path.parse(htmlFile.name).name);

module.exports = {
  entry: pages.reduce((config, page) => {
    config[page] = `./src/${page}.tsx`;
    return config;
  }, {}),

  plugins: [].concat(
    pages.map((page) => new HtmlWebpackPlugin({
      title: `${page}`,
      template: `./src/${page}.html`,
      filename: `${page}.html`,
      chunks: [page],
    }))
  ),

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/i,
        use: 'html-loader'
      },
      // CSS Modules rule for files ending with .module.css
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: true, // Use CommonJS syntax for default export
              modules: {
                exportOnlyLocals: false, // Ensure the full CSS is exported (not just locals)
                localIdentName: '[name]__[local]___[hash:base64:5]',
                exportLocalsConvention: 'camelCase',
              },
            },
          },
        ],
      },
      // Global CSS rule for all other .css files
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]', // Ensure images go to the correct folder
        },
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.svg', '.json'],
  },

  output: {
    filename: '[name].js',
    library: 'epicgames-react-frontend',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '../../../SignallingWebServer/Public'),
    clean: true,
    globalObject: 'this',
    hashFunction: 'xxhash64',
  },

  experiments: {
    futureDefaults: true,
    css:false
  },

  devServer: {
    static: {
      directory: path.join(__dirname, '../../../SignallingWebServer/Public'),
    },
  },
};
