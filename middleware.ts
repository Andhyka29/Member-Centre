import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';
    const pathname = request.nextUrl.pathname;

    const publicPaths = ['/', '/register'];

    if (!isLoggedIn && !publicPaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (isLoggedIn && publicPaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/dashboard/:path*', '/register'],
};