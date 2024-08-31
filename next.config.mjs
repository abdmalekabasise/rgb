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
    const nonce = crypto.randomBytes(16).toString('base64');
    const scriptSrc = process.env.NODE_ENV === 'development'
      ? `'self' 'nonce-${nonce}' 'unsafe-eval'`
      : `'self' 'nonce-${nonce}'`;
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; connect-src 'self' http://localhost:5000; img-src 'self' data: https://cdn.jsdelivr.net; script-src ${scriptSrc}; style-src 'self' 'nonce-${nonce}' 'unsafe-eval';`,
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
