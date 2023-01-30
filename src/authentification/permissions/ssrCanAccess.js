import {defaultSessionData} from "@/auth/context/auth-context";

export const ssrCanAccess = async ({req}) => {
    const user = req.session.user;

    // redirect if the user isn't logged in.
    if (!user || !user.isLoggedIn || !user.tokenVerified) {
        return {
            redirect: {
                permanent: false,
                destination: "/compte/connexion"
            },
            props: {
                user: {...defaultSessionData},
            }
        };
    }

    return {
        props: { user: req.session.user }
    };
};