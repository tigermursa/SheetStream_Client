import { NextResponse } from 'next/server';

export function middleware(request) {
  const accessToken = request.cookies.get('access_token');

  // Logging for debugging
  console.log('Access Token:', accessToken);

  // If access token exists, proceed with the request
  if (accessToken) {
    return NextResponse.next();
  }

  // If access token is missing, redirect to /auth/login
  console.log('No access token found, redirecting to /auth/login');
  return NextResponse.redirect(new URL('/auth/login', request.url));
}

// Apply this middleware only to paths that need authentication
export const config = {
  matcher: [
    '/', // Replace with your protected paths
  ],
};
