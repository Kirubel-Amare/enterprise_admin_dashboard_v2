/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        // Handle markdown and license files as raw assets
        '*.md': { raw: true },
        '**/*.LICENSE': { raw: true },
        '**/*.txt': { raw: true },
      }
    }
  }
}

module.exports = nextConfig