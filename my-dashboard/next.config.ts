/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // You can add valid experimental features here if needed
    // serverComponentsExternalPackages: ['some-package'],
  },
  webpack: (config: any, { isServer }: { isServer?: boolean }) => {
    // Ignore markdown and license files
    config.module.rules.push({
      test: /\.(md|LICENSE|txt)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/chunks/[path][name][ext]'
      }
    });

    return config;
  },
  // Add these for better error handling during build
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: false, // Set to true temporarily if you have type errors blocking build
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
  // Enable SWC minification for better performance
  swcMinify: true,
}

module.exports = nextConfig