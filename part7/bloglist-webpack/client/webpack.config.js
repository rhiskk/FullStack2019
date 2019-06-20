const path = require('path')
const webpack = require('webpack')

const config = (env, argv) => {
  console.log('argv', argv.mode)

  const backend_url = argv.mode === 'production'
    ? 'https://radiant-plateau-25399.herokuapp.com/api/notes'
    : 'http://localhost:3003'

  return {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
      // eslint-disable-next-line no-undef
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js'
    },
    devServer: {
      // eslint-disable-next-line no-undef
      contentBase: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3000,
      proxy: {
        '/api': backend_url
      }
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader']
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url)
      })
    ]
  }
}

// eslint-disable-next-line no-undef
module.exports = config