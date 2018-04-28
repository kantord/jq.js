module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.pegjs$/,
        loader: 'pegjs-loader?trace=false&cache=true'
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
    ]
}}
