import { sessionApiRouteContextInjector } from "@/auth/session/handlers/withSession";
import { externalApiRequest } from "@/src/hooks/http-hook";
import { getSessionFromData, getUserHeadersFromUserSession } from "@/auth/context/auth-context";
import { getVisitorDataFromRequest } from "@/auth/context/visitor-context";
import appRoutes from "@/src/Routing/AppRoutes";
import { lang } from "@/common/Data/GlobalConstants";
import { NextResponse } from "next/server";
import { appDefaultSessionOptions } from "@/auth/session/Session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

//export default sessionApiRouteContextInjector(loginRoute);

export default async function handler(req, res) {
    //From uri and to Uri params in cookies ?
    // check if cookie are accepted.
    //if redirect with no can to api.
    //4. Redirect the user to the cookie params page.
    //context.req.headers.referer

    const session = await getIronSession(req, res, appDefaultSessionOptions);

    let cookiesChoices = null;

    if (req.cookies?.avnuCookies) {
        cookiesChoices = JSON.parse(req.cookies.avnuCookies);
    }

    if (cookiesChoices && cookiesChoices.auth === true) {
        const response = await externalApiRequest("/login", {
            body: JSON.stringify(req.body),
            headers: getUserHeadersFromUserSession(session.user ?? null, false),
            origin: "fromServer",
        });

        const sessionUser = getSessionFromData(response.data.user);
        const visitor = getVisitorDataFromRequest(req);

        session.user = {
            ...sessionUser,
            ...visitor,
        };

        await session.save();

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

    if (!cookiesChoices?.avnuCookies || cookiesChoices?.avnuCookies.auth !== true) {
        res.send({
            text: lang.cookieMessageNeedAuthCookie,
            positive: false,
            redirectUri: appRoutes.paramsCookies.asPath,
            user: "{}",
        });
    }
}
