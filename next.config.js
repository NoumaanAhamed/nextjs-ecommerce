/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains:["localhost","images.unsplash.com","lh3.googleusercontent.com","unsplash.com","th.bing.com"],
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "unsplash.com"},
      { hostname: "imgs.search.brave.com"}
      ,{ hostname: "th.bing.com"}
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
