import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/commercial-conversions',
        destination: '/feasibility-package',
        permanent: true,
      },
      {
        source: '/hmos',
        destination: '/feasibility-package',
        permanent: true,
      },
      {
        source: '/high-end-residential',
        destination: '/feasibility-package',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
