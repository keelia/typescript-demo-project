const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
  htmlPlugin: new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../index.html'),
  })
}
