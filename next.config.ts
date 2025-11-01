import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // Production source maps - set via environment variable
  productionBrowserSourceMaps: process.env.NODE_ENV === 'production' && process.env.ENABLE_SOURCE_MAPS === 'true',
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Optimize for LCP performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons', 'framer-motion'],
    // Enable inline critical CSS
    // Note: This will inline critical CSS and defer non-critical CSS
    // This should reduce the critical request chain significantly
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'uplifting-champion-8a8387e8ac.media.strapiapp.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  transpilePackages: ['styled-components'],
  webpack: (config, { dev, isServer }) => {
    // Optimize chunks for production
    if (!dev && !isServer) {
      // More aggressive code splitting to reduce initial bundle
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 30,
        minSize: 5000, // Smaller min size for better sharing
        cacheGroups: {
          // Split vendor libraries more granularly
          defaultVendors: false,
          default: false,
          // React and friends
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            name: 'react',
            priority: 40,
          },
          // UI libraries - defer these to reduce critical path
          radix: {
            test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
            name: 'radix-ui',
            priority: 30,
          },
          // Icon libraries - commonly used across pages
          icons: {
            test: /[\\/]node_modules[\\/](lucide-react|@radix-ui\/react-icons)[\\/]/,
            name: 'icons',
            priority: 31, // Below UI components but above radix
            minSize: 1000,
            reuseExistingChunk: true,
          },
          // Common UI components - create shared chunk to eliminate duplication
          uiComponents: {
            test: /[\\/]src[\\/]components[\\/]ui[\\/]/,
            name: 'ui-components',
            priority: 35, // Higher than radix to ensure UI components get their own chunk
            enforce: true,
            minSize: 2000, // Allow smaller chunks for better sharing
          },
          // Shared hooks and utilities - consolidated
          shared: {
            test: /[\\/]src[\\/](lib|hooks)[\\/]/,
            name: 'shared',
            priority: 32,
            minSize: 1000, // Allow even smaller for utilities
            reuseExistingChunk: true,
          },
          // Other shared components beyond UI
          components: {
            test: /[\\/]src[\\/]components(?!.*ui)[\\/]/,
            name: 'components',
            priority: 33,
            minSize: 2000,
            reuseExistingChunk: true,
          },
          // Animation libraries - defer these to reduce critical path
          framerMotion: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            priority: 25,
          },
          // Lottie (heavy animation lib) - defer these
          lottie: {
            test: /[\\/]node_modules[\\/]lottie-react[\\/]/,
            name: 'lottie',
            priority: 25,
          },
          // Sanity CMS (only needed on certain pages) - defer these
          sanity: {
            test: /[\\/]node_modules[\\/](sanity|@sanity)[\\/]/,
            name: 'sanity',
            priority: 20,
          },
          // Other node_modules - smaller chunks to reduce CSS size
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name: 'lib',
            priority: 10,
            reuseExistingChunk: true,
            minSize: 10000, // Smaller chunks for better parallel loading
            maxSize: 50000, // Limit max size for better caching
          },
        },
      };

      // Enable tree shaking
      config.optimization.usedExports = true;
      config.optimization.sideEffects = true;

      // CSS optimization handled by Next.js experimental.optimizeCss
    }
    return config;
  },
  
};

export default nextConfig;
