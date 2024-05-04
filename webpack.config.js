const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

let plugins = []; // if using any plugins for both dev and production
const devPlugins = []; // if using any plugins for development

const prodPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  })
];

const isProd = process.env.NODE_ENV === 'production';

plugins = plugins.concat(
  isProd ? prodPlugins : devPlugins
);

module.exports = {
  mode: isProd ? 'production' : 'development',
  context: __dirname,
  entry: "./frontend/bass_case.jsx",
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js"
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    ],
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", "*"],
    fallback: {
      fs: false,
      buffer: require.resolve('buffer/')
    }
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  externals: { 'react-native-fs': 'reactNativeFs' }
};
