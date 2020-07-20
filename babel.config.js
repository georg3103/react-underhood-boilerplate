module.exports = {
  presets: ["@babel/preset-env"],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    [
      "@babel/transform-react-jsx",
      {
        pragma: "OwnReact.createElement"
      }
    ]
  ]
};
