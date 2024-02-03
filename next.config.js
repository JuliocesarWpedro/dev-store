/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['github.com'],
  },
  env: {
    API_URL: 'http://127.0.0.1:3000',
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
