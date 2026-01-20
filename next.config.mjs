/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "img.garagepotti.xyz",
        port: "",
        pathname: "/upload/**",
      },
    ],
  },
};

export default nextConfig;
