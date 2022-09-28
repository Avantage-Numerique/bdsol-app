import {withSessionRoute} from "@/auth/session/handlers/withSession";
import {defaultSessionData} from "@/auth/context/auth-context";
import {lang} from "@/src/common/Data/GlobalConstants";

export default withSessionRoute(logoutRoute);

async function logoutRoute(req, res) {

    req.session.user = defaultSessionData;
    await req.session.save();

    res.send({
        text: lang.successDisconnected,
        positive: true,
        redirectUri: "/",
        user: req.session.user
    });
}