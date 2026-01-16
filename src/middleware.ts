


// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("admin_token")?.value;
//   const { pathname } = request.nextUrl;

//   /**
//    * Public auth-related pages
//    */
//   const isAuthPage =
//     pathname.startsWith("/login") ||
//     pathname.startsWith("/verifyAccount");

//   /**
//    * Protected dashboard routes
//    */
//   const isProtectedRoute = !isAuthPage;

//   /**
//    * Not logged in → block protected routes
//    */
//   if (!token && isProtectedRoute) {
//     return NextResponse.redirect(
//       new URL("/login", request.url)
//     );
//   }

//   /**
//    * Logged in → block auth pages
//    */
//   if (token && isAuthPage) {
//     return NextResponse.redirect(
//       new URL("/", request.url)
//     );
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!_next|favicon.ico|api|/Runnars\\.svg).*)"],
// };




import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  const { pathname } = request.nextUrl;

  // Skip authentication for this specific image
  if (pathname === "/Runnars.svg") {
    return NextResponse.next();
  }

  // Public auth pages
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/verifyAccount");

  // Protected pages
  const isProtectedRoute = !isAuthPage;

  // Not logged in → redirect to login
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Logged in → block auth pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|api/|favicon.ico).*)"], // keep matcher simple
};

