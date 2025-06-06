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
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

export default nextConfig;