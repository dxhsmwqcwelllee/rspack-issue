const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/bootstrap.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app3',
      filename: 'mf-entry.js',
      remotes: {
        'app1': 'app1@[window.MF_CONFIG.app1.url]',
      },
      exposes: {
        './Button': './src/components/Button.vue',
        './subtract': './src/utils/math.js'
      },
      shared: {
        vue: {
          singleton: true,
          requiredVersion: '2.7.14'
        }
      }
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3003,
    hot: true,
  }
};