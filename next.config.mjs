import path from 'path';

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
      config.resolve.alias['@'] = path.resolve(__dirname, 'src');
      return config;
  },
};

export default nextConfig;