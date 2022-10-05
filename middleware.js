import { NextResponse } from 'next/server';
import {getIronSession} from "iron-session/edge";
import {appDefaultSessionOptions} from "@/auth/session/Session";

/**
 * Added in version 12.2 of nextjs, as for stable version.
 * @param req
 * @return {NextResponse}
 */
export async function middleware(request) {

    //const session = await getIronSession(request, response, appDefaultSessionOptions);

    // do anything with session here:
    //const { user } = session;
    //response.user = user;

    // like mutate user:
    // user.something = someOtherThing;
    // or:
    // session.user = someoneElse;

    // uncomment next line to commit changes:
    // await session.save();
    // or maybe you want to destroy session:
    // await session.destroy();

    //console.log("from middleware", user);

    // demo:
    //if (user?.admin !== "true") {
    //    // unauthorized to see pages inside admin/
    //    return NextResponse.redirect(new URL('/unauthorized', req.url)) // redirect to /unauthorized page
    //}
    return NextResponse.next();
}

// Where does this middleware would run
export const config = {
    matcher: '/:path*'
}