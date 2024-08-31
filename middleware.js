import { NextResponse } from 'next/server';

export function middleware(req) {
    // Generate a nonce using the Web Crypto API
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    const nonce = btoa(String.fromCharCode(...array));

    const response = NextResponse.next();

    // Set the Content Security Policy header
    response.headers.set(
        'Content-Security-Policy',
        `default-src 'self'; img-src 'self' data: https://cdn.jsdelivr.net; font-src 'self' data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' http://localhost:5000;`
    );

    // Set the nonce in a custom header for potential client-side use
    response.headers.set('X-NONCE', nonce);

    return response;
}