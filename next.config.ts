import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/how-it-works',
        destination: '/feasibility-package#how-it-works',
        permanent: true,
      },
      {
        source: '/tools',
        destination: '/tools/class-ma-checker',
        permanent: true,
      },
      {
        source: '/conversions/office-to-resi-class-ma',
        destination: '/conversions/commercial-to-residential',
        permanent: true,
      },
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
