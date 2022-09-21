import {createContext, useContext, useEffect, useState} from 'react';

export const defaultSessionData = {
    isPending: false,
    isLoggedIn: false,
    token: null,
    id: null,
    avatar: null,
    name: null,
    username: null,
    createdAt: null,
    ip: null,
    browser: null,
    language: null,
    login: () => {},
    logout: () => {}
};

export const getSessionFromData = (userData) => {
    if (userData) {
        return {
            isPending: false,//maybe will deprecate with we use cookie. The waiting for localstorage isn't needed anymore.
            isLoggedIn: userData.token !== "" && userData.token !== undefined && userData.token !== null,
            token: userData.token ?? null, //There must be at least a token, for now
            id: userData.id ?? null,
            avatar: userData.avatar ?? null,
            name: userData.name ?? null,
            username: userData.username ?? null,
            createdAt: userData.createdAt ?? null,
            ip: userData.ip ?? null,
            browser: userData.browser ?? null,
            language: userData.language ?? null,
        }
    }
    return defaultSessionData;
}

const AuthContext = createContext({});

//inspired by https://stackoverflow.com/questions/71498723/next-js-how-to-use-usestate-and-authcontext-without-invalidating-ssg-html
//seem nice.https://solveforum.com/forums/threads/solved-cannot-destructure-property-of-object-from-context.520739/

export function AuthProvider({fromSessionUser, children}) {

    const [user, setUser] = useState(fromSessionUser ?? {...defaultSessionData} );
    const [loading, setLoading] = useState(true);

    return (
        <AuthContext.Provider value={{
            user: user,
            setUser: setUser,
            loading: loading,
            setLoading: setLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}


//export const AuthContext = createContext(defaultSessionData);