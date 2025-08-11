/** @type {import('next').NextConfig} */

// Check if the current environment is for GitHub Pages deployment.
// The 'GITHUB_ACTIONS' environment variable is automatically set to 'true' in GitHub Actions.
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const repo = 'portfolio'; // Replace with your repository name

// Import MDX wrapper
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

const nextConfig = {
  // Keep your GitHub Pages export logic
  output: isGithubActions ? 'export' : undefined,

  basePath: isGithubActions ? `/${repo}` : '',
  assetPrefix: isGithubActions ? `/${repo}/` : '',

  images: {
    unoptimized: true, // keep this for static export
  },

  // Enable MDX page extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

// Export with MDX support
module.exports = withMDX(nextConfig);
