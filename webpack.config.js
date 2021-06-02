const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './js/index.js',
    timeline: './js/Timeline.js',
    taskchart: './js/TaskChart.js'
  },
  resolve: {
    alias: {
      'jquery-ui': 'jquery-ui/jquery-ui.js',
      modules: path.join(__dirname, 'node_modules')
    }
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  externals: [
    'jquery',
    'jquery-ui-bundle',
    'moment',
    'kuende-livestamp',
    /^@lumino\/.+$/,
    /^@jupyterlab\/.+$/
  ],
  devtool: 'source-map',
  plugins: [
    /* Use the ProvidePlugin constructor to inject jquery implicit globals */
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': "jquery'",
      'window.$': 'jquery'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],

            plugins: ['add-module-exports']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'images',
            publicPath: 'images'
          }
        }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
      },
      {
        test: /node_modules[\\\/]vis[\\\/].*\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['env'],
            babelrc: false
          }
        }
      }
    ]
  }
};
