import { NextResponse } from 'next/server';

export function middleware(req) {
    const nonce = crypto.randomBytes(16).toString('base64');

    const response = NextResponse.next();

    // Set the Content Security Policy header with the generated nonce
    response.headers.set(
        'Content-Security-Policy',
        `default-src 'self'; img-src 'self' data: https://cdn.jsdelivr.net; font-src 'self' data:; script-src 'self' 'nonce-${nonce}' 'unsafe-eval'; style-src 'self' 'nonce-${nonce}'; connect-src 'self' http://localhost:5000;`
    );

    // Set the nonce in a custom header for potential client-side use
    response.headers.set('X-NONCE', nonce);

    return response;
}