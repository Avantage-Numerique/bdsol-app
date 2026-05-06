import { sessionApiRouteContextInjector } from "@/auth/session/handlers/withSession";
import { defaultSessionData } from "@/auth/context/auth-context";
import { lang } from "@/src/common/Data/GlobalConstants";
import { appDefaultSessionOptions } from "@/auth/session/Session";
import { getIronSession } from "iron-session";

//export default sessionApiRouteContextInjector(logoutRoute);

export default async function handler(req, res) {
    const session = await getIronSession(req, res, appDefaultSessionOptions);
    //req.session.user = defaultSessionData;
    //await req.session.save();
    await session.destroy();
    //getVisitorDataFromContext
    res.send({
        text: lang.successDisconnected,
        positive: true,
        redirectUri: "/",
        user: defaultSessionData,
    });
}
