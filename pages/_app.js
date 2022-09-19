import {useCallback, useState, useEffect} from 'react'

import {AuthContext, defaultSessionData, getSessionFromData} from '../authentication/context/auth-context'
import Layout from '../app/layouts/Layout'

import {
    deleteTargetLocalStorage,
    getLocalStorage,
    isLocalStorageAccessible,
    setLocalStorage
} from "../app/session/LocalStorage";

import {getVisitorData} from "../authentication/context/visitor-context";
/************************************
 *
 * Import global SCSS files
 *
 ***********************************/
import '../styles/main.scss'

/*export async function getServerSideProps(context) {
    const {req} = context;
    return {
        props: {}, // will be passed to the page component as props
    }
}*/


function MyApp({Component, pageProps}) {

    //Store the session values
    const [session, setSession] = useState({
        ...defaultSessionData,
        isPending: true,
        ip: pageProps.visitor.ip
    });

    /**
     * Functions to modify the authentication context
    */
    const login = useCallback(userData => {
        userData.isPending = false;
        const newSession = getSessionFromData(userData);

        const userSession = {...defaultSessionData, ...newSession, ip: pageProps.visitor.ip};

        //Update the state
        setSession(userSession);

    }, [session]);


    const logout = useCallback(() => {

        deleteTargetLocalStorage('userData');//this change nothing, only that it's keeping up with the two others callback.
        setSession(defaultSessionData);

    }, [session]);


    /*
       Consult the localStorage to see of the user is connected and remove the pending state
    */
    useEffect(() => {
        if (isLocalStorageAccessible()) {

            const storedUserData = getLocalStorage('userData');

            if (!storedUserData || !storedUserData.isLoggedIn) {
                setSession({
                    ...defaultSessionData,
                    isPending: false,
                    ip: pageProps.visitor.ip
                });

            } else {
                setSession(storedUserData);
            }
        }
    }, []);

    /**
     * Set session trigger and then this effect apply userData into localStorage.
     */
    useEffect(() => {
        // save serssion data in the localStorage
        if (isLocalStorageAccessible()) {
            session.isPending = false;
            setLocalStorage('userData', session);
        }
    }, [session])


    /**
     * Main app render.
     */
    return (
        <>

            {/* Authentication context provided to all the subsequent elements */}
            <AuthContext.Provider value={{
                ...(session ?? defaultSessionData),
                login: login,
                logout: logout
            }}>
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
    return {
        pageProps: {
            visitor: getVisitorData(ctx)
        },
    }
}

export default MyApp
