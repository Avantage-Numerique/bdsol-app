import {defaultSessionData} from "../context/auth-context";

export const ssrCanAccess = async ({req,res}) => {

    const user = req.session.user;

    if (user && user.isLoggedIn && user.tokenVerified) {
        return {
            props: { user: req.session.user }
        };
    }

    res.setHeader("location", "/compte/connexion");
    res.statusCode = 302;
    res.end();

    return {
        props: {
            user: {...defaultSessionData},
        }
    };
};