import {withSessionRoute} from "../../authentication/session/handlers/withSession";
import {sendExternalApiRequest} from "../../app/hooks/http-hook";

export default withSessionRoute(verifySessionRoute);

async function verifySessionRoute(req, res) {

    const response = await sendExternalApiRequest(
        "/verify-token",
        'POST',
        JSON.stringify({
            token: req.session.user.token
        })
    );
    req.session.user.tokenVerified = !response.error && response.tokenVerified;
    await req.session.save();

    res.send({
        text: response.message,
        positive: !response.error,
        redirectUri: response.error ? "/compte/connexion" : "/compte",
        user: req.session.user
    });
}