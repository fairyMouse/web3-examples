const { merge } = require("webpack-merge");
const path = require("path");

const WindiCSSWebpackPlugin = require("windicss-webpack-plugin");

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    const customConfig = {
      resolve: {
        alias: {
          src: path.resolve(__dirname, "src/"),
        },
      },
      plugins: [new WindiCSSWebpackPlugin()],
      module: {
        rules: [
          {
            test: /\.svg$/i,
            issuer: { and: [/\.(js|ts)x?$/] },
            loader: require.resolve("@svgr/webpack", "url-loader"),
          },
        ],
      },
    };

    // 修改一些现有的配置
    if (isServer) {
      // 这是一个例子，如果我们在服务器端，我们可能想要做一些不同的配置
    }

    return merge(config, customConfig);
  },
};

module.exports = nextConfig;
