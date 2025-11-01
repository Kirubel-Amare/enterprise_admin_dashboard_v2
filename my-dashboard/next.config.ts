/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        // Ignore markdown files
        '*.md': { raw: true },
        // Ignore LICENSE files
        '**/*.LICENSE': { raw: true },
      }
    }
  },
  webpack: (config: any) => {
    // Ignore markdown and license files
    config.module.rules.push({
      test: /\.(md|LICENSE)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/chunks/[path][name][ext]'
      }
    });
    return config;
  }
}

module.exports = nextConfig;