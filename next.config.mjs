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

    // Define script-src directive
    const scriptSrc = process.env.NODE_ENV === 'development'
      ? `'self' 'nonce-${nonce}' 'unsafe-eval'`
      : `'self' 'nonce-${nonce}' 'unsafe-eval'`;

    // Define style-src directive, ensuring nonce is included
    const styleSrc = `'self' 'nonce-${nonce}'`;

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; img-src 'self' data: https://cdn.jsdelivr.net; script-src 'self'; style-src 'self'; connect-src 'self';`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
