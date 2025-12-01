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
      {
        protocol: "https",
        hostname: "**kakaocdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
