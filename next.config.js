/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.BASE_PATH,
  assetPrefix: process.env.BASE_PATH,
  env: {
    BASE_PATH: process.env.BASE_PATH
  }
};

module.exports = nextConfig;
