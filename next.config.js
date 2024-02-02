/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['github.com'],
  },
  env: {
    API_URL: 'http://localhost:3000',
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
