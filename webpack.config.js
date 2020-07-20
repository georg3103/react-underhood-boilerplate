const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: ["@babel/polyfill", "./samples/index.js"],
  output: {
    path: `${__dirname}/public`,
    filename: "bundle.js"
  },

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                [
                  "@babel/transform-react-jsx",
                  { pragma: "OwnReact.createElement" }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },

  resolve: {
    extensions: [".js", ".jsx"]
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],

  devServer: {
    host: "localhost",
    contentBase: "./public",
    hot: true
  }
};
