import {withSessionRoute} from "../../authentication/session/handlers/withSession";
import {sendExternalApiRequest} from "../../app/hooks/http-hook";
import {useContext} from "react";
import {AuthContext, getSessionFromData} from "../../authentication/context/auth-context";

export default withSessionRoute(loginRoute);

async function loginRoute(req, res) {

    const response = await sendExternalApiRequest(
        "/login",
        'POST',
        JSON.stringify(req.body)
    );
    const sessionUser = getSessionFromData(response.data.user);
    req.session.user = sessionUser
    await req.session.save();

    res.send({
        text: response.message,
        positive: !response.error,
        redirectUri: response.error ? "/compte/connexion" : "/compte",
        user: sessionUser
    });
}