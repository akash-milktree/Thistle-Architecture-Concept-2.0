import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old live-site journal URLs (root-level on Wix) map to /blog.
      {
        source: '/journal',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/class-ma-prior-approval-what-you-need-to-know',
        destination: '/blog/class-ma-prior-approval-what-you-need-to-know',
        permanent: true,
      },
      {
        source: '/buying-vs-building-a-home-in-the-uk',
        destination: '/blog/buying-vs-building-a-home-in-the-uk',
        permanent: true,
      },
      {
        source: '/self-building-an-eco-home-in-the-uk',
        destination: '/blog/self-building-an-eco-home-in-the-uk',
        permanent: true,
      },
      {
        source: '/brick-vs-stone-vs-concrete-masonry-in-self-build-homes',
        destination: '/blog/brick-vs-stone-vs-concrete-masonry-in-self-build-homes',
        permanent: true,
      },
      {
        source: '/class-q-barn-conversions',
        destination: '/blog/class-q-barn-conversions',
        permanent: true,
      },
      {
        source: '/10-pros-and-cons-of-masonry-for-self-build-houses',
        destination: '/blog/10-pros-and-cons-of-masonry-for-self-build-houses',
        permanent: true,
      },
      {
        source: '/self-build-icfs-construction',
        destination: '/blog/self-build-icfs-construction',
        permanent: true,
      },
      {
        source: '/self-build-timber-frame-house',
        destination: '/blog/self-build-timber-frame-house',
        permanent: true,
      },
      {
        source: '/self-build-sips-construction',
        destination: '/blog/self-build-sips-construction',
        permanent: true,
      },
      {
        source: '/how-much-does-it-cost-to-self-build-in-2023',
        destination: '/blog/how-much-does-it-cost-to-self-build-in-2023',
        permanent: true,
      },
      {
        source: '/how-to-fund-a-self-build-home',
        destination: '/blog/how-to-fund-a-self-build-home',
        permanent: true,
      },
      {
        source: '/top-10-considerations-when-it-comes-to-self-building',
        destination: '/blog/top-10-considerations-when-it-comes-to-self-building',
        permanent: true,
      },
      {
        source: '/how-to-find-the-right-self-build-architect',
        destination: '/blog/how-to-find-the-right-self-build-architect',
        permanent: true,
      },
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
