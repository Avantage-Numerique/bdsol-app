import {withSessionRoute} from "@/auth/session/handlers/withSession";
import {externalApiRequest} from "@/src/hooks/http-hook";
import {getSessionFromData, getUserHeadersFromUserSession} from "@/auth/context/auth-context";
import {getVisitorDataFromRequest} from "@/auth/context/visitor-context";
import appRoutes from "@/src/Routing/AppRoutes";
import {lang} from "@/common/Data/GlobalConstants";

export default withSessionRoute(loginRoute);

async function loginRoute(req, res) {
    //From uri and to Uri params in cookies ?
    // check if cookie are accepted.
    //if redirect with no can to api.
    //4. Redirect the user to the cookie params page.
    //context.req.headers.referer
    const cookies = JSON.parse(req.cookies?.avnuCookies);

    if (cookies && cookies.auth === true) {
        const response = await externalApiRequest(
            "/login",
            {
                body: JSON.stringify(req.body),
                headers: getUserHeadersFromUserSession(req.session.user, false),
                origin: "fromServer"
            }
        );

        const sessionUser = getSessionFromData(response.data.user);
        const visitor = getVisitorDataFromRequest(req);

        req.session.user = {
            ...sessionUser,
            ...visitor
        };

        await req.session.save();

        res.send({
            text: response.message,
            positive: !response.error,
            redirectUri: response.error ? appRoutes.connection.asPath : appRoutes.accueil.asPath,
            user: sessionUser
        });
        return;
    }

    if (!cookies?.avnuCookies || cookies?.avnuCookies.auth !== true) {
        res.send({
            text: lang.cookieMessageNeedAuthCookie,
            positive: false,
            redirectUri: appRoutes.paramsCookies.asPath,
            user: "{}"
        });
    }
}