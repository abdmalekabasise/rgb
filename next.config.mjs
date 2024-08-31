import crypto from 'crypto';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        port: "",
      },
    ],
  },
  async headers() {
    // Note: Nonce will be set in middleware, not here, to ensure consistency.
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; connect-src 'self' http://localhost:5000; img-src 'self' data: https://cdn.jsdelivr.net; script-src 'self'; style-src 'self';`,
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*', // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;