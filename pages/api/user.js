import { withSessionRoute } from "../../authentication/session/handlers/withSession";

export default withSessionRoute(userRoute);

async function userRoute(req, res) {

    req.session.user = response.data.user;
    await req.session.save();

    res.send({
        text: response.message,
        positive: !response.error
    });
}