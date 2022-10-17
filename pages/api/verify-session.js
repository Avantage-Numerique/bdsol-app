import {withSessionRoute} from "@/auth/session/handlers/withSession";
import {verifyToken} from "@/auth/callbacks/verify-token.callback";

export default withSessionRoute(verifySessionRoute);

async function verifySessionRoute(req, res) {

    const response = await verifyToken(req.session.user.token);

    const isTokenVerified = !response.error && response.tokenVerified;
    req.session.user.tokenVerified = isTokenVerified;
    req.session.user.isLoggedIn = isTokenVerified;
    await req.session.save();

    res.send({
        text: response.message,
        positive: isTokenVerified,
        user: req.session.user
    });
}