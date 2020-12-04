const path = require('path');
const {htmlPlugin}=require('./plugin.base');
module.exports = {
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dev-dist'),
  },
  devtool:'source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dev-dist'),
    compress: true,
    port: 9000,
    watchContentBase: true,
    hot:true,
    publicPath : '/',
    inline: true,
    open: true
  },
  watch: true,
  plugins: [
    htmlPlugin
  ]
};