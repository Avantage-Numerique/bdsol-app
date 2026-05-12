import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { appDefaultSessionOptions } from "@/auth/session/Session";
import { getIronSession } from "iron-session";
import appRoutes from "@/src/Routing/AppRoutes";
import { lang } from "moment";
import { externalApiRequest } from "@/src/hooks/http-hook";

//export default sessionApiRouteContextInjector(loginRoute);

export async function GET(request) {
    console.log("APP router LOGIN - GET");
    const cookieStore = await getIronSession(await cookies(), appDefaultSessionOptions);
    console.log("COOKIES", cookieStore);
    return NextResponse.json({ ...cookieStore, status: 200, message: ";)" });
}

export async function POST(request) {
    console.log("APP router LOGIN - POST");
    const cookieStore = await cookies();
    let cookiesChoices = null;
    if (cookieStore?.avnuCookies) {
        cookiesChoices = JSON.parse(cookieStore.avnuCookies);
    }

    if (cookiesChoices && cookiesChoices.auth === true) {
        const externalApiResponse = await externalApiRequest("/login", {
            body: JSON.stringify(req.body),
            headers: getUserHeadersFromUserSession(req.session.user, false),
            origin: "fromServer",
        });

        const sessionUser = getSessionFromData(externalApiResponse.data.user);
        const visitor = getVisitorDataFromRequest(request);

        request.session.user = {
            ...sessionUser,
            ...visitor,
        };

        await request.session.save();

        //catch the redirect param to redirect user
        const referer = req.headers.referer;
        let redirect = "/"; //Default to home
        if (referer) {
            const url = new URL(referer);
            const redirectParam = url.searchParams.get("redirect");
            if (redirectParam) {
                redirect = redirectParam;
            }
        }

        return new Response(
            {
                text: externalApiResponse.message,
                positive: !externalApiResponse.error,
                redirectUri: externalApiResponse.error ? appRoutes.connection.asPath : redirect,
                user: sessionUser,
            },
            {
                status: externalApiResponse.status,
            }
        );
    }

    if (!cookieStore?.avnuCookies || cookieStore?.avnuCookies.auth !== true) {
        return new Response(
            {
                text: lang.cookieMessageNeedAuthCookie,
                positive: false,
                redirectUri: appRoutes.paramsCookies.asPath,
                user: "{}",
            },
            {
                status: externalApiResponse.status,
            }
        );
    }
}

/**
 * Builder les headers d'array pour réduire
 * @param user {object}
 * @param withAuthentification {boolean}
 * @return {object}
 */
const getUserHeadersFromUserSession = (user, withAuthentification = false) => {
    const userHeaders = {};
    if (user) {
        userHeaders["x-forwarded-for"] = user.ip ?? "";
        userHeaders["user-agent"] = user.browser ?? "";

        if (withAuthentification) {
            userHeaders["Authorization"] = user.token ? "Bearer " + user.token : "";
        }
    }

    return userHeaders;
};

const getVisitorDataFromRequest = (request) => {
    const visitor = visitorContextDefaults;

    visitor.ip = getVisitorIpFromRequest(request);
    visitor.browser = getVisitorBrowserFromRequest(request);

    return visitor;
};

/**
 *
 * @param userData
 * @return {{createdAt: null, ip: null, browser: null, name: null, isLoggedIn: boolean, tokenVerified: boolean, language: null, id: null, avatar: null, isPending: boolean, token: null, username: null}|{createdAt: (any|number|null), ip: null, browser: (*|null), name: null, tokenVerified: (boolean|boolean|*), isLoggedIn: (boolean|boolean|*), language: ("typescript"|"flow"|string|*|null), id: null, avatar: null, isPending: boolean, token: (string|string|any|null), username: null}}
 */
const getSessionFromData = (userData) => {
    if (userData) {
        return {
            //maybe will deprecate with we use cookie. The waiting for localstorage isn't needed anymore.
            isPending: false,
            // on login, this is set to true by default
            tokenVerified: userData.tokenVerified ?? false,
            isLoggedIn: userData.tokenVerified ?? false,
            token: userData.token ?? null, //There must be at least a token, for now
            id: userData._id ?? null,
            avatar: userData.avatar ?? null,
            name: userData.name ?? null,
            username: userData.username ?? null,
            createdAt: userData.createdAt ?? null,
            ip: userData.ip ?? null,
            browser: userData.browser ?? null,
            language: userData.language ?? null,
            verify: userData.verify ?? { isVerified: false },
        };
    }
    return defaultSessionData;
};
const visitorContextDefaults = {
    ip: "",
    browser: "",
};
/*
async function loginRoute(req, res) {
    //From uri and to Uri params in cookies ?
    // check if cookie are accepted.
    //if redirect with no can to api.
    //4. Redirect the user to the cookie params page.
    //context.req.headers.referer
    console.log("loginRoute", req.cookies);

    const cookiesRaw = context.ctx.req.cookies;
    let cookiesChoices = null;
    if (cookiesRaw?.avnuCookies) {
        cookiesChoices = JSON.parse(cookiesRaw.avnuCookies);
    }

    if (cookiesChoices && cookiesChoices.auth === true) {
        const response = await externalApiRequest("/login", {
            body: JSON.stringify(req.body),
            headers: getUserHeadersFromUserSession(req.session.user, false),
            origin: "fromServer",
        });

        const sessionUser = getSessionFromData(response.data.user);
        const visitor = getVisitorDataFromRequest(req);

        req.session.user = {
            ...sessionUser,
            ...visitor,
        };

        await req.session.save();

        //catch the redirect param to redirect user
        const referer = req.headers.referer;
        let redirect = "/"; //Default to home
        if (referer) {
            const url = new URL(referer);
            const redirectParam = url.searchParams.get("redirect");
            if (redirectParam) {
                redirect = redirectParam;
            }
        }

        res.send({
            text: response.message,
            positive: !response.error,
            redirectUri: response.error ? appRoutes.connection.asPath : redirect,
            user: sessionUser,
        });
        return;
    }

    if (!cookies?.avnuCookies || cookies?.avnuCookies.auth !== true) {
        res.send({
            text: lang.cookieMessageNeedAuthCookie,
            positive: false,
            redirectUri: appRoutes.paramsCookies.asPath,
            user: "{}",
        });
    }
}
*/
