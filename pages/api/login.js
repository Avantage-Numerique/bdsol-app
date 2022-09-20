import {withSessionRoute} from "../../authentication/session/handlers/withSession";
import {sendExternalApiRequest} from "../../app/hooks/http-hook";

export default withSessionRoute(loginRoute);

async function loginRoute(req, res) {

    console.log("api/login loginRoute", req.body);

    const response = await sendExternalApiRequest(
        "/login",
        'POST',
        JSON.stringify(req.body)
    );

    req.session.user = response.data.user;
    await req.session.save();

    console.log("api/login session saved.", req.session, response.data.user);

    res.send({
        text: response.message,
        positive: !response.error,
        redirectUri: response.error ? "/compte/connexion" : "/compte"
    });
}