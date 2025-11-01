/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: true
  },
  webpack: (config: any) => {
    // Ignore LICENSE and README files in node_modules
    config.module.rules.push({
      test: /(LICENSE|README\.md)$/,
      loader: 'ignore-loader',
    });
    return config;
  }
};

module.exports = nextConfig;
