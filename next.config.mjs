import path from 'path';

import { fileURLToPath } from 'url'; // Adiciona para lidar com o caminho correto

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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