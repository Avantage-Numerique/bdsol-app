import { withSessionRoute } from "@/auth/session/handlers/withSession";

export default withSessionRoute(userRoute);

/**
 * Api internal to nextjs to get the session user already decrypted.
 * @param req
 * @param res
 * @return {Promise<void>}
 */
async function userRoute(req, res) {
    if (req.session.user) {
        res.json({
            ...req.session.user,
            isLoggedIn: true,
        });
    } else {
        res.json({
            isLoggedIn: false,
        });
    }
}