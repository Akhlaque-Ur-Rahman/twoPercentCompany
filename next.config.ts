import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* SEO optimizations */
  
  // Enable strict mode for better error handling
  reactStrictMode: true,
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Enable compression
  compress: true,
  
  // Generate ETags for caching
  generateEtags: true,
  
  // Trailing slashes
  trailingSlash: false,
  
  // Power off X-Powered-By header
  poweredByHeader: false,
};

export default nextConfig;
