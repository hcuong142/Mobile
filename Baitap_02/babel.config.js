module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }]],
    plugins: [
      "nativewind/babel",
      [
        "module-resolver",
        {
          root: ".",
          extensions: [".ts", ".tsx", ".jsx", ".js", ".json", ".svg", ".jpg"],
          alias: {
            "~/*": "./src",
            "@components": "./src/components",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};