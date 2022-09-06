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


/*
//this on hold.
const routeManager = new NamedRoutes();
const routes = {
    "about": {
        pathname: '/a-propos'
    }
}

for (let routeName in routes) {
    routeManager.addRoute(routeName, routes[routeName]);
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
        /*{
            isPending: userData.isPending,
            isLoggedIn: userData !== null && userData.token !== undefined && userData.token !== null,
            token: userData.token,     //There must be at least a token, for now
            id: userData.id ? userData.id : null,
            avatar: userData.avatar ? userData.avatar : null,
            name: userData.name ? userData.name : null,
            username: userData.username ? userData.username : null,
            createdAt: userData.createdAt ? userData.createdAt : null
        }*/
        const userSession = {...defaultSessionData, ...newSession, ip: pageProps.visitor.ip};
        //Update the state
        //setSession({...session, ...newSession});
        //don't use session object here, to reset the object as with the newSession values.
        setSession(userSession);

        console.log("defaultSessionData", defaultSessionData);
        console.log("newSession", newSession);
        console.log("userSession", userSession);
        console.log("session", session);

        //Store in the local storage
        //localStorage.setItem('userData', JSON.stringify(newSession));
        //setLocalStorage('userData', session);

    }, [session])


    const logout = useCallback(() => {

        deleteTargetLocalStorage('userData');//this change nothing, only that it's keeping up with the two others callback.
        setSession(defaultSessionData);

    }, [session]);

    /*
    *
       Consult the localStorage to see of the user is connected and remove the pending state
    *
    */
    useEffect(() => {
        console.log ("checking localstorage and presence of the userData");
        if (isLocalStorageAccessible()) {

            const storedUserData = getLocalStorage('userData');

            console.log ("userData", storedUserData);

            if (!storedUserData || !storedUserData.isLoggedIn) {
                console.log("Cant' retreive data on local storage, set to default", storedUserData);
                //deleteTargetLocalStorage('userData');
                setLocalStorage('userData', defaultSessionData);
                //setSession(storedUserData);
            } else {
                console.log("Set session with local storage data", storedUserData);
                setSession(storedUserData);
            }
        }

    }, []);

    useEffect(() => {
        //This has to be inside a useEffect to let the time at the browser to charge
        //and the local storage to be available
        //Fill the variable with session's data

        /*if (storedUserData && !storedUserData.isLoggedIn) {
            console.log("saving session to local storage", session);
            setLocalStorage('userData', session);
        }*/
        if (isLocalStorageAccessible()) {
            console.log("Save session into the localstorage", session);
            //const storedUserData = getLocalStorage('userData');
            session.isPending = false;
            setLocalStorage('userData', session);
        }

        //JSON.parse(localStorage.getItem('userData'));
        //Verify if there is data in the storedata
       /* if (storedData) {
            //Then save the data into the state
            setSession({...session, ...storedData, isPending: false});
        } else {
            //These is nothing but it has been evaluate so we need to change the pending state
            setSession({...session, isPending: false});
            localStorage.setItem('userData', JSON.stringify(session));
        }*/
    }, [session])

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
