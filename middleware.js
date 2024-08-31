import { NextResponse } from 'next/server';

export function middleware(req) {
    // Generate a nonce using the Web Crypto API
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    const nonce = btoa(String.fromCharCode(...array));

    const response = NextResponse.next();

    // Properly format the CSP header without line breaks
    response.headers.set(
        'Content-Security-Policy',
        `default-src 'self'; img-src 'self' data: https://cdn.jsdelivr.net; font-src 'self' data:; script-src 'self' 'nonce-${nonce}'; style-src 'self'; connect-src 'self';`
    );

    const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'nonce-FYKuIBaJPajQ8JczO8jirA==' 'unsafe-eval';
  ...
`;

    response.headers.set('X-NONCE', nonce);

    return response;
}
