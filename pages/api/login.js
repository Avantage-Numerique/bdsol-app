import {withSessionRoute} from "@/auth/session/handlers/withSession";
import {externalApiRequest} from "@/src/hooks/http-hook";
import {getSessionFromData, getUserHeadersFromUserSession} from "@/auth/context/auth-context";
import {getVisitorDataFromRequest} from "@/auth/context/visitor-context";

export default withSessionRoute(loginRoute);

async function loginRoute(req, res) {

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
        redirectUri: response.error ? "/compte/connexion" : "/compte",
        user: sessionUser
    });
}