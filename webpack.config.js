const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Currency converter MVC',
            filename: 'index.html',
            template: './src/html-template/template.html'
        }),
        new CleanWebpackPlugin (['./build'])
    ],
    devtool: 'source-map',
    devServer: {
      contentBase: "./build",
      port: 3000
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['react','babel-preset-env']
            }
          }
        },
        {
          test: /\.css$/, 
          use: [
            'style-loader',
            'css-loader'
          ]
        }
      ]
    }
  };