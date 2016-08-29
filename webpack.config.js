var webpack = require('webpack');

module.exports = {
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.less$/, loader: 'style!css!less' }
    ]
  },
  output: {
    libraryTarget: 'commonjs2'
  },
  externals: {
    'react': 'react',
    'object-assign': 'object-assign'
  }
};
