import { withSessionRoute } from "../../authentication/session/handlers/withSession";

export default withSessionRoute(userRoute);

async function userRoute(req, res) {
    res.send({
        user: req.session.user
    });
}