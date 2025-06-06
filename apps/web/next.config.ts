import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: "standalone",
  // Only include page files with these extensions (explicitly exclude test files)
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  webpack: async (config, { isServer: _isServer, dev: _dev }) => {
    // Use dynamic import for webpack to avoid issues in monorepo
    const webpack = await import('webpack');
    
    // Ignore test files in node_modules
    config.plugins?.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /[\\/]node_modules[\\/].*\.(test|spec)\.(js|jsx|ts|tsx)$/
      })
    );
    
    // Exclude test files from being processed as pages
    config.module?.rules?.push({
      test: /\.(test|spec)\.(js|jsx|ts|tsx)$/,
      use: { loader: 'ignore-loader' }
    });
    
    return config;
  },
};

export default nextConfig;
