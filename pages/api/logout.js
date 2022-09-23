import {withSessionRoute} from "../../authentication/session/handlers/withSession";
import {defaultSessionData, getSessionFromData} from "../../authentication/context/auth-context";
import {lang} from "../../app/common/Data/GlobalConstants";

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