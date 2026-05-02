import { sessionContextInjector } from "@/auth/session/handlers/withSession";
import { defaultSessionData } from "@/auth/context/auth-context";
import { lang } from "@/src/common/Data/GlobalConstants";

export default sessionContextInjector(logoutRoute);

async function logoutRoute(req, res) {
    //req.session.user = defaultSessionData;
    //await req.session.save();
    await req.session.destroy();
    //getVisitorDataFromContext
    res.send({
        text: lang.successDisconnected,
        positive: true,
        redirectUri: "/",
        user: defaultSessionData,
    });
}
