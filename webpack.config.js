var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var Ex = require('extract-text-webpack-plugin');

module.exports = [
  {
  name: "browser",
  context: path.join(__dirname),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./src/js/admin.js",
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
        // exclude: /(node_modules)/, 
        loader: Ex.extract({ fallback: 'style-loader', use: [ 'css-loader' ] })  // 单独打包出CSS，这里配置注意下
      },
      // {
      //   test: /\.css$/,
      //   loader: 'style-loader!css-loader' 
      // },     
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
    filename: "./src/dist/admin.js",
  },
  plugins: [
    // debug ? [new Ex("./src/dist/admin.css")] : [
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new Ex({ filename : "./src/dist/admin.css"})
  ],
},
{
  name: "browser",
  context: path.join(__dirname),
  devtool: debug ? "inline-sourcemap" : null,
  entry: './server/lib/page.js',
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
      // { test: /\.js/, loader: "jsx-loader" },
      {
        test: /\.css$/,
        loader: 'isomorphic-style-loader!css-loader' 
      }
    ]
  },
  output: {
    path: __dirname,
    filename: "./server/page.generator.js",
    library: 'page',
    libraryTarget: 'commonjs' 
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ]
},
];
