import {getIronSession, withIronSessionApiRoute, withIronSessionSsr} from "iron-session";

import {appDefaultSessionOptions} from "@/auth/session/Session";

export function withSessionRoute(handler) {

    return async (context) => {
        const { req, res } = context;
        const session = await getIronSession(req, res, appDefaultSessionOptions);

        if (!session.user) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        }

        // Exécution de la fonction getServerSideProps d'origine si elle existe
        if (handler) {
            const handlerData = await handler(context);

            // Fusion des props
            if (handlerData.props) {
                handlerData.props = {
                    ...handlerData.props,
                    user: session.user,
                };
                return handlerData;
            }
        }

        // Si pas de gssp ou si gsspData.props est undefined
        return {
            props: { user: session.user },
        };
    };

    //return getIronSession(cookies(), appDefaultSessionOptions);
    //return withIronSessionApiRoute(handler, appDefaultSessionOptions);
}

export function withSessionSsr(handler) {
    return async (context) => {
        const { req, res } = context;
        const session = await getIronSession(req, res, appDefaultSessionOptions);


        // Exécution de la fonction getServerSideProps d'origine si elle existe
        if (handler) {
            const handlerData = await handler(context);

            // Fusion des props
            if (handlerData.props) {
                handlerData.props = {
                    ...handlerData.props,
                    user: session.user ?? null,
                };
                return handlerData;
            }
        }

        // Si pas de gssp ou si gsspData.props est undefined
        return {
            props: { user: session.user ?? null },
        };
    };
}