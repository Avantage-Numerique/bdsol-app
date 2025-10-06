import { defaultSessionData } from "@/auth/context/auth-context";

export const ssrCanAccess = async ({ req }) => {
    const user = req.session.user;

    //acceptable action, if the user is logged in.
    if (user && user.isLoggedIn && user.tokenVerified) {
        return {
            props: {
                user: req.session.user,
                userCanAccess: true
            }
        };
    }

    //User cant access, doing the redirection appropriate.
    const referer = req.headers.referer;
    let refererPath = "/"
    if (referer) {
        const refererUrl = new URL(referer);
        refererPath = refererUrl.pathname + refererUrl.search;
    }

    return {
        redirect: {
            permanent: false,
            destination: "/compte/connexion"+`?redirect=${encodeURI(refererPath)}`
        },
        props: {
            user: { ...defaultSessionData },
            userCanAccess: false
        }
    };
};