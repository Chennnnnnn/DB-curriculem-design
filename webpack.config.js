var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./src/js/reader.js",
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/, 
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['react-html-attrs'], //添加组件的插件配置
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader' 
      },
      // {
      //   test:/\.(png|jpg|jpeg|gif|svg|)$/i,
      //   loader:'file-loader',
      // },
      // {
      //   test:/\.(png|jpg|gif|svg|)$/i,
      //   loader:'url-loader',
      //   query: {
      //     limit:2000,
      //     name:'../image/[name].[ext]'
      //   }
      // }
    ]
  },
  output: {
    path: __dirname,
    filename: "./src/dist/reader.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
