/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Exclude old src directory from build
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/src/**', '**/node_modules/**'],
    }
    return config
  },
}

module.exports = nextConfig

