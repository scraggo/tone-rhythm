const path = require('path');

module.exports = {
  entry: './src/tone-rhythm.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'tone-rhythm.js',
    library: 'toneRhythm'
  },
  resolve: {
    modules: ['node_modules/', 'node_modules/tone']
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }]
  }
};
