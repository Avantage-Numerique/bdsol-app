import {useCallback, useState, useEffect} from 'react'

import {AuthContext, defaultSessionData, getSessionFromData} from '../authentication/context/auth-context';
import Layout from '../app/layouts/Layout'

import {
    deleteTargetLocalStorage,
    getLocalStorage,
    isLocalStorageAccessible,
    setLocalStorage
} from "../app/session/LocalStorage";

import {getVisitorDataFromContext} from "../authentication/context/visitor-context";
/************************************
 *
 * Import global SCSS files
 *
 ***********************************/
import '../styles/main.scss'
import {getIronSession} from "iron-session";
import {appDefaultSessionOptions} from "../authentication/session/Session";


function MyApp({Component, pageProps}) {

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
            <AuthContext.Provider value={{...pageProps.user}}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AuthContext.Provider>
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

    const {ctx} = context;
    const {req, res} = ctx;
    const visitor = getVisitorDataFromContext(ctx);
    let session;
    try {
        console.log('getIronSession', req, res, appDefaultSessionOptions);
        session = await getIronSession(req, res, appDefaultSessionOptions);
    } catch(e) {
        throw(e);
    }

    if (!session.ip) {
        session = {
            ...visitor,
            ...session
        }
    }

    return {
        pageProps: {
            user: getSessionFromData(session)
        },
    }
}

//it isn't call in _app : noMyApp.getServerSideProps or I didn't declare it the good way.

export default MyApp;
