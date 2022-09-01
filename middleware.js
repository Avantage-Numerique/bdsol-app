import { NextResponse } from 'next/server';

/**
 * Added in version 12.2 of nextjs, as for stable version.
 * @param request
 * @return {NextResponse}
 */
export function middleware(request) {
    /**
     * This run before, about every request.
     */
    const data = {
            welcome: "Hi there from getServerSideProps",
            ip: "not set",
            req: (request !== undefined) && (request !== null)
        }
    if (request) {

        if (request.headers["x-forwarded-for"]) {
            data.ip = request.headers["x-forwarded-for"].split(',')[0];
        }

        if (request.headers["x-real-ip"] && request.connection) {
            data.ip = request.connection.remoteAddress;
        }

        if (request.connection && request.connection.remoteAddress) {
            data.ip = request.connection.remoteAddress;
        }
    }

    return NextResponse.next();
}

// Where does this middleware would run
export const config = {
    matcher: '/:path*'
}