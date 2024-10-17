import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */

const nextConfig = {
      reactStrictMode: true,
      images: {
            remotePatterns: [
                  {
                        protocol: 'https',
                        hostname: 'bertioga-mugs.s3.sa-east-1.amazonaws.com',
                        port: '',
                  },
            ],
      },
      webpack: (config) => {
            config.resolve.fallback = {
                  crypto: require.resolve('crypto-browserify'),
            };
            return config;
      },
};

export default nextConfig;