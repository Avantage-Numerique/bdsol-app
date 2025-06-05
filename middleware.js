import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import {getIronSession} from "iron-session";
import {cookies, headers} from "next/headers";

import {choicesSessionOptions, appDefaultSessionOptions, canSaveAuthCookie} from "@/auth/session/SessionOptions";
import {getVisitorDataFromRequest} from "@/auth/context/visitor-context";

/**
 * Added in version 12.2 of nextjs, as for stable version.
 * @param req
 * @return {NextResponse}
 */
export async function middleware(request) {
    const response = NextResponse.next();
    // get the public data of current user and pass it down.
    const visitor = await getVisitorDataFromRequest(request);

    const publicSession = await getIronSession(
        request,
        response,
        choicesSessionOptions
    );
    //console.log("middleware", "visitor", visitor, "auth", authSession, "public", publicSession);
    //console.log("middleware", canSaveAuthCookie(publicSession));

    // get the public data of current user and pass it down.
    console.log("publicSession", publicSession, canSaveAuthCookie(publicSession));
    // check the JWT
    if (canSaveAuthCookie(publicSession)) {

        const authSession = await getIronSession(
            request,
            response,
            appDefaultSessionOptions,
        );
    }

    publicSession.user = {
        ...visitor
    }
    await publicSession.save();

    // Deterine if we passed it to app
    // return props to app

    /*if (request.cookies.has('nextjs')) {

    }*/
    /*response.cookies.set({
        name: choicesSessionOptions.cookieName,
        value: {
            session: {
                user: {
                    ...visitor
                }
            }
        },
        path: '/'
    });*/
    /*const response = NextResponse.next()
    response.cookies.set('vercel', 'fast')
    response.cookies.set({
        name: 'vercel',
        value: 'fast',
        path: '/',
    })*/

    //NextResponse.redirect(new URL('/unauthorized', req.url))
    return response;
}

// Where does this middleware would run
export const config = {
    matcher: '/:path*'
}