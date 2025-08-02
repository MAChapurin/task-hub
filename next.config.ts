/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    allowedDevOrigins: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'http://192.168.1.81:3000',
    ],
  },
  images: {
    domains: ['github.com'],
  },
};

module.exports = nextConfig;
