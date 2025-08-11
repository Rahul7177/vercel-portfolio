/** @type {import('next').NextConfig} */

// Import MDX wrapper
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

const nextConfig = {
  // Disabling unoptimized images as it's not needed for Vercel deployment.
  // Vercel can handle image optimization automatically.
  images: {
    unoptimized: false,
  },

  // Enable MDX page extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

// Export with MDX support
module.exports = withMDX(nextConfig);
