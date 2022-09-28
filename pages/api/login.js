import {withSessionRoute} from "@/auth/session/handlers/withSession";
import {sendExternalApiRequest} from "@/src/hooks/http-hook";
import {getSessionFromData} from "@/auth/context/auth-context";
import {getVisitorDataFromRequest} from "@/auth/context/visitor-context";

export default withSessionRoute(loginRoute);

async function loginRoute(req, res) {

    const response = await sendExternalApiRequest(
        "/login",
        'POST',
        JSON.stringify(req.body)
    );

    const sessionUser = getSessionFromData(response.data.user);
    const visitor = getVisitorDataFromRequest(req);
    console.log(visitor);
    sessionUser.ip = visitor.ip;

    req.session.user = sessionUser;
    await req.session.save();

    console.log(req.session.user);
    res.send({
        text: response.message,
        positive: !response.error,
        redirectUri: response.error ? "/compte/connexion" : "/compte",
        user: sessionUser
    });
}