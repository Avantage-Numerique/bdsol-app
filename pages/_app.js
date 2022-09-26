import {getIronSession} from "iron-session";
import App from "next/app";
import {appDefaultSessionOptions} from "../authentication/session/Session";
import {AuthProvider} from '../authentication/context/auth-context';
import Layout from '../app/layouts/Layout'

//import {useCallback, useState, useEffect} from 'react'
//import {getVisitorDataFromContext} from "../authentication/context/visitor-context";
//import useAuthentification from "../authentication/hooks/useAuthentification";
/************************************
 *
 * Import global SCSS files
 *
 ***********************************/
import '../styles/main.scss'


function MyApp({Component, pageProps, user}) {


    //const {user, setUser} = AuthProvider();

    //Store the session values
    //const [session, setSession] = useState(pageProps.user);

    /**
     * Functions to modify the authentication context
    */
    /*const login = useCallback(userData => {
        userData.isPending = false;
        const newSession = getSessionFromData(userData);

        const userSession = {...defaultSessionData, ...newSession, ip: pageProps.user.ip};

        //Update the state
        setSession(userSession);

    }, [session]);*/


    /*const logout = useCallback(() => {

        deleteTargetLocalStorage('userData');//this change nothing, only that it's keeping up with the two others callback.
        setSession(defaultSessionData);

    }, [session]);*/


    /*
       Consult the localStorage to see of the user is connected and remove the pending state
    */
    /*useEffect(() => {
        console.log(user);
        if (isLocalStorageAccessible()) {

            const storedUserData = getLocalStorage('userData');

            if (!storedUserData || !storedUserData.isLoggedIn) {
                setSession({
                    ...defaultSessionData,
                    isPending: false,
                    ip: pageProps.user.ip
                });

            } else {
                setSession(storedUserData);
            }
        }
    }, []);*/

    /**
     * Set session trigger and then this effect apply userData into localStorage.
     */
    /*useEffect(() => {
        // save serssion data in the localStorage
        if (isLocalStorageAccessible()) {
            session.isPending = false;
            setLocalStorage('userData', session);
        }
    }, [session])*/

    /**
     * Main app render.
     */
    return (
        <>
            {/* Authentication context provided to all the subsequent elements */}
            <AuthProvider fromSessionUser={user}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AuthProvider>
        </>
    )
}

/**
 * Get info from the user that requested the uri.
 * @param context
 * @return {Promise<{pageProps: {visitor: {ip: string, browser: string}}}>}
 * @inheritDoc https://nextjs.org/docs/api-reference/data-fetching/get-initial-props
 */
MyApp.getInitialProps = async (context) => {

    const appProps = await App.getInitialProps(context);

    if (context.ctx.req && context.ctx.res) {

        const { user } = await getIronSession(
            context.ctx.req,
            context.ctx.res,
            appDefaultSessionOptions,
        );

        return {
            pageProps: {
                ...appProps,
                user: user
            },
            ...appProps,
            user: user
        };
    }

    return appProps
}

//it isn't call in _app : noMyApp.getServerSideProps or I didn't declare it the good way.

export default MyApp;
