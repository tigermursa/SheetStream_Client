// import { NextResponse } from "next/server";

// // Middleware function
// export function middleware(req) {
//   // Retrieve the token from cookies
//   const token = req.cookies.get("access_token");

//   // If the token exists, proceed with the request
//   if (token) {
//     return NextResponse.next();
//   }

//   // If no token, redirect to login or another page
//   const loginUrl = new URL("/auth/login", req.url);
//   return NextResponse.redirect(loginUrl);
// }

// // Define the paths where this middleware should run
// export const config = {
//   matcher: ["/upload"], // Add the routes you want to protect
// };
