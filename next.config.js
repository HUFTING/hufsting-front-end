/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['https://lh3.googleusercontent.com', 'phinf.pstatic.net'],
  },
  async rewrites() {
    return [
      {
        source: '/apis/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL + '/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
