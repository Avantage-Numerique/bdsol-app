import { defaultSessionData } from "@/auth/context/auth-context";

export const ssrCanAccess = async ({ req }) => {
    const user = req.session.user;
    console.log("ssrCanAccess can he ?", user.isLoggedIn, "tokenVerified", user.tokenVerified);
    if (user && user.isLoggedIn && user.tokenVerified) {
        return {
            props: {
                user: req.session.user,
                userCanAccess: true
            }
        };
    }

    //Catch where user was for redirection
    const referer = req.headers.referer;
    let refererPath = "/"
    if (referer) {
        const refererUrl = new URL(referer);
        console.log(refererUrl)
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