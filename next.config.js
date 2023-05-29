/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false,
      },
    ];
  },
  output: "standalone",
  env: {
    API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;
