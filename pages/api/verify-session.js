import {withSessionRoute} from "@/auth/session/handlers/withSession";
import {sendExternalApiRequest} from "@/src/hooks/http-hook";

export default withSessionRoute(verifySessionRoute);

async function verifySessionRoute(req, res) {

    //path, method = 'GET', body = null, headers = {}, additionnalFetchParams={}, isDataJson=true, origin="browser"
    const response = await sendExternalApiRequest(
        "/verify-token",
        'POST',
        JSON.stringify({
            token: req.session.user.token
        }),
        undefined,
        undefined,
        true,
        "fromserver"
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