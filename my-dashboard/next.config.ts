/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove experimental turbo config since it's causing conflicts
  experimental: {},
  // Optional: Add if you need to handle static files
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig