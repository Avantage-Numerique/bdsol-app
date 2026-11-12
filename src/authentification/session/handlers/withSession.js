import { getIronSession } from "iron-session";
import { appDefaultSessionOptions } from "@/auth/session/Session";

/**
 * @deprecated IronSession < 8, use sessionContextInjector
 * @param handler
 * @returns {*}
 */
export function withSessionRoute(handler) {
    //return withIronSessionApiRoute(handler, appDefaultSessionOptions);
}

/**
 * @deprecated IronSession < 8, use sessionContextInjector
 * @param handler
 * @returns {*}
 */
export function withSessionSsr(handler) {
    //return withIronSessionSsr(handler, appDefaultSessionOptions);
}

export function sessionContextInjector(handler) {
    return async function (context) {
        context.req.session = await getIronSession(context.req, context.res, appDefaultSessionOptions);
        return handler(context);
    };
}
export function sessionApiRouteContextInjector(handler) {
    return async function (req, res) {
        context.req.session = await getIronSession(req, res, appDefaultSessionOptions);
        return handler(req, res);
    };
}
