import { defaultSessionData } from "@/auth/context/auth-context";

export const ssrCanAccess = async ({ req }) => {
    const user = req.session.user;

    // redirect if the user isn't logged in.
    if (!user || !user.isLoggedIn || !user.tokenVerified) {

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
                destination: "/compte/connexion"+`?redirect=${encodeURIComponent(getCleanRedirectPath(refererPath))}`
            },
            props: {
                user: { ...defaultSessionData },
            }
        };
    }

    return {
        props: { user: req.session.user }
    };
};