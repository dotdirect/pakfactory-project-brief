/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Exclude old src directory from build
  webpack: (config, { isServer }) => {
    // Ignore src directory completely
    config.resolve.alias = {
      ...config.resolve.alias,
    }
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/src/**', '**/node_modules/**'],
    }
    return config
  },
  // Exclude src from page generation
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
}

module.exports = nextConfig

