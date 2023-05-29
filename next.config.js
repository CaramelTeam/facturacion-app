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
};

module.exports = nextConfig;
