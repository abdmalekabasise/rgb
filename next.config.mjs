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
      : `'self' 'nonce-${nonce}'`;

    // Define style-src directive, ensuring nonce is included
    const styleSrc = `'self' 'nonce-${nonce}'`;

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `img-src 'self' data: https://cdn.jsdelivr.net; script-src ${scriptSrc}; style-src ${styleSrc}; connect-src 'self';`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
