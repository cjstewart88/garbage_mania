const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/javascript/game.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: './src'
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist', 'javascript'),
    publicPath: 'javascript'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, 'src', 'images'), to: path.resolve(__dirname, 'dist', 'images') },
      { from: path.resolve(__dirname, 'src', 'index.html'), to: path.resolve(__dirname, 'dist', 'index.html') } 
    ])
  ]
};
