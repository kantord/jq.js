module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.pegjs$/,
        loader: 'pegjs-loader?trace=true&cache=false'
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
    ]
}}
