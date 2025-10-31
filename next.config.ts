import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
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
  experimental: {
    esmExternals: 'loose',
    optimizeCss: true,
  },
  webpack: (config, { dev, isServer }) => {
    // Optimize chunks for production
    if (!dev && !isServer) {
      // More aggressive code splitting to reduce initial bundle
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
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
          // UI libraries
          radix: {
            test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
            name: 'radix-ui',
            priority: 30,
          },
          // Animation libraries
          framerMotion: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            priority: 25,
          },
          // Lottie (heavy animation lib)
          lottie: {
            test: /[\\/]node_modules[\\/]lottie-react[\\/]/,
            name: 'lottie',
            priority: 25,
          },
          // Sanity CMS (only needed on certain pages)
          sanity: {
            test: /[\\/]node_modules[\\/](sanity|@sanity)[\\/]/,
            name: 'sanity',
            priority: 20,
          },
          // Other node_modules
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name: 'lib',
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      };

      // Enable tree shaking
      config.optimization.usedExports = true;
      config.optimization.sideEffects = true;
    }
    return config;
  },
  compiler: {
    // Remove console.logs in production
    removeConsole: process.env.NODE_ENV !== 'development' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
};

export default nextConfig;
