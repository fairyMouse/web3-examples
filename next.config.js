const WindiCSSWebpackPlugin = require('windicss-webpack-plugin');

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // 这里可以根据需要修改webpack配置

    // 添加一个新的webpack插件
    config.plugins.push(new WindiCSSWebpackPlugin());

    // 修改一些现有的配置
    if (isServer) {
      // 这是一个例子，如果我们在服务器端，我们可能想要做一些不同的配置
    }

    // 返回修改后的配置
    return config;
  },
};

module.exports = nextConfig;
