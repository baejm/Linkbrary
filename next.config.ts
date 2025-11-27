/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.youtube.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.naver.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.pstatic.net",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
