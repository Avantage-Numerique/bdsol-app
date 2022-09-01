import {useCallback, useState, useEffect} from 'react'

import {AuthContext, defaultSessionData} from '../authentication/context/auth-context'
import Layout from '../app/layouts/Layout'
import NamedRoutes from "../app/utils/NamedRoutes";

import {getVisitorData} from "../authentication/context/visitor-context";
/************************************
 *
 * Import global SCSS files
 *
 ***********************************/
import '../styles/main.scss'


const routeManager = new NamedRoutes();
const routes = {
    "about": {
        pathname: '/a-propos'
    }
}

for (let routeName in routes) {
    routeManager.addRoute(routeName, routes[routeName]);
}


export async function getServerSideProps(context) {

    const v = getVisitorData(context);
    console.log(v);
    return {
        props: {
            visitor: getVisitorData(context)
        },
    }
}

function MyApp({Component, pageProps, visitor}) {

    //Store the session values
    const [session, setSession] = useState({
        isPending: true,                        //Tells the frontend that the localStorage has not been consulted yet
        token: false,
        _id: null,
        avatar: null,
        name: null,
        username: null,
        ip: null,
        browser: null
    });

    /*useEffect(() => {
        console.log(session);
    }, [session])*/

    /*
    *
      Functions to modify the authentication context
    *
    */

    const login = useCallback(userData => {

        const newSession = {
            token: userData.token,     //There must be at least a token, for now
            id: userData.id ? userData.id : null,
            avatar: userData.avatar ? userData.avatar : null,
            name: userData.name ? userData.name : null,
            username: userData.username ? userData.username : null,
            createdAt: userData.createdAt ? userData.createdAt : null
        }

        //Update the state
        //setSession({...session, ...newSession});
        //don't use session object here, to reset the object as with the newSession values.
        setSession({...defaultSessionData, ...newSession});

        //Store in the local storage
        //localStorage.setItem('userData', JSON.stringify(newSession));
        setLocalStorage('userData', session);

    }, [session])

    const logout = useCallback(() => {

        //localStorage.removeItem('userData')
        deleteTargetLocalStorage('userData');//this change nothing, only that it's keeping up with the two others callback.

        setSession(defaultSessionData);
        //kept because I wasn't shure why we add the values of session in this ?
        /*setSession({
            ...session,
            token: null,
            id: null,
            avatar: null,
            name: null,
            username: null,
            createdAt: null,
            ip: "",
            browser: ""
        });*/

    }, [session]);

    // LocalStorage Callbacks.

    const setLocalStorage = useCallback((objectName, value) => {
        localStorage.setItem(objectName, JSON.stringify(value));
    }, []);

    const getLocalStorage = useCallback((objectName) => {
        const storedData = localStorage.getItem(objectName);
        if (storedData) return JSON.parse(storedData);

        return null;
    }, []);

    const deleteTargetLocalStorage = useCallback( (objectName) => {
        localStorage.removeItem(objectName);
    });

    /*
    *
       Consult the localStorage to see of the user is connected and remove the pending state
    *
    */
    useEffect(() => {
        //This has to be inside a useEffect to let the time at the browser to charge
        //and the local storage to be available
        console.log("useEffect");
        //Fill the variable with session's data

        const storedData = getLocalStorage('userData');
        setLocalStorage('userData', {...session, ...storedData});

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

                isPending: session.isPending,
                isLoggedIn: session && session.token,
                token: session.token,
                id: session.id,
                avatar: session.avatar,
                name: session.name,
                username: session.username,
                createdAt: session.createdAt,
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

export default MyApp
