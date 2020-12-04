const path = require('path');
const {htmlPlugin}=require('./plugin.base');
module.exports = {
  mode: 'production',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [
    htmlPlugin
  ]
};