import {withSessionRoute} from "@/auth/session/handlers/withSession";
import {sendExternalApiRequest} from "@/src/hooks/http-hook";
import {getSessionFromData} from "@/auth/context/auth-context";
import {getVisitorDataFromRequest} from "@/auth/context/visitor-context";

export default withSessionRoute(loginRoute);

async function loginRoute(req, res) {

    //path, method = 'GET', body = null, headers = {}, additionnalFetchParams={}, isDataJson=true, origin="browser"
    const response = await sendExternalApiRequest(
        "/login",
        'POST',
        JSON.stringify(req.body),
        undefined,
        undefined,
        true,
        "fromserver"
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
        redirectUri: response.error ? "/compte/connexion" : "/compte",
        user: sessionUser
    });
}