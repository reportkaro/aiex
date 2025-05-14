/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    // Enable better image formats (WebP, AVIF)
    formats: ['image/avif', 'image/webp'],
    
    // Common device widths for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // Size increments for responsive images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Minimize image requests by caching aggressively
    minimumCacheTTL: 60,
    
    // Disable the blur-up placeholder for large GIFs to improve performance
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    
    // Custom loader to handle GIF files more efficiently
    loader: 'default',
  },
  experimental: {
    // Enable optimized loading strategies
    optimizePackageImports: ['framer-motion'],
  },
};

export default nextConfig; 