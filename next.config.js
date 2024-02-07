/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['post-phinf.pstatic.net'],
  },
};

module.exports = nextConfig;
