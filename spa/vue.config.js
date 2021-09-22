const path = require("path");
const webpack = require("webpack");

function resolveSrc(_path) {
  return path.join(__dirname, _path);
}

module.exports = {
  pages: {
    index: {
      // entry for the page
      entry: "src/main.js",
      title: "Vibbraneo NF",
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set("layouts", path.resolve(__dirname, "src/layouts"));
    config.resolve.alias.set("views", path.resolve(__dirname, "src/views"));
    config.resolve.alias.set("pages", path.resolve(__dirname, "src/pages"));
    config.resolve.alias.set(
      "components",
      path.resolve(__dirname, "src/components")
    );
    config.resolve.alias.set("store", path.resolve(__dirname, "src/store"));
    config.resolve.alias.set("api", path.resolve(__dirname, "src/api"));
    config.resolve.alias.set(
      "vue$",
      // If using the runtime only build
      path.resolve(__dirname, "node_modules/vue/dist/vue.runtime.esm.js")
      // Or if using full build of Vue (runtime + compiler)
      // path.resolve(__dirname, 'node_modules/vue/dist/vue.esm.js')
    );
  },
  configureWebpack: {
    // Set up all the aliases we use in our app.
    resolve: {
      alias: {
        src: resolveSrc("src"),
        "chart.js": "chart.js/dist/Chart.js",
      },
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6,
      }),
    ],
  },
};
