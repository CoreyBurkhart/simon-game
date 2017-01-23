const path = require('path')

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: './build',
        filename: 'app.bundle.js'
    },
    module: {
    loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
    }]
  },
  devServer: {
  contentBase: path.join(__dirname, "/build"),
  compress: true,
  port: 9000
  }
};
