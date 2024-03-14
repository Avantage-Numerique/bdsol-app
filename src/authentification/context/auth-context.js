import {createContext, useContext, useState} from 'react';
import useApi from '@/src/hooks/useApi';
import defaultCookiesChoices from "@/src/common/Cookies/cookiesChoices";

import {csSaveCookieChoices} from "@/common/Cookies/clientSideSaveCookiesChoices";
import fetchInternalApi from "@/src/api/fetchInternalApi";

export const defaultSessionData = {
    isPending: false,
    isLoggedIn: false,
    tokenVerified: false,
    token: null,
    id: null,
    avatar: null,
    name: null,
    username: null,
    createdAt: null,
    ip: null,
    browser: null,
    language: null,
    verify:{ isVerified: false }
};

/**
 *
 * @param userData
 * @return {{createdAt: null, ip: null, browser: null, name: null, isLoggedIn: boolean, tokenVerified: boolean, language: null, id: null, avatar: null, isPending: boolean, token: null, username: null}|{createdAt: (any|number|null), ip: null, browser: (*|null), name: null, tokenVerified: (boolean|boolean|*), isLoggedIn: (boolean|boolean|*), language: ("typescript"|"flow"|string|*|null), id: null, avatar: null, isPending: boolean, token: (string|string|any|null), username: null}}
 */
export const getSessionFromData = (userData) => {
    if (userData) {
        return {
            //maybe will deprecate with we use cookie. The waiting for localstorage isn't needed anymore.
            isPending: false,
            // on login, this is set to true by default
            tokenVerified: userData.tokenVerified ?? false,
            isLoggedIn: userData.tokenVerified ?? false,
            token: userData.token ?? null, //There must be at least a token, for now
            id: userData._id ?? null,
            avatar: userData.avatar ?? null,
            name: userData.name ?? null,
            username: userData.username ?? null,
            createdAt: userData.createdAt ?? null,
            ip: userData.ip ?? null,
            browser: userData.browser ?? null,
            language: userData.language ?? null,
            verify: userData.verify ?? { isVerified: false }
        }
    }
    return defaultSessionData;
}

/**
 * Builder les headers d'array pour réduire
 * @param user {object}
 * @param withAuthentification {boolean}ç
 * @return {object}
 */
export const getUserHeadersFromUserSession = (user, withAuthentification= false) => {
    const userHeaders = {};
    if (user) {
        userHeaders["x-forwarded-for"] = user.ip ?? "";
        userHeaders["user-agent"] = user.browser ?? "";

        if (withAuthentification) {
            userHeaders["Authorization"] = user.token ? 'Bearer ' + user.token : '';
        }
    }

    return userHeaders;
}


const AuthContext = createContext({});

export function AuthProvider({fromSessionUser, appMode, acceptedCookies, children}) {

    const [user, setUser] = useState(fromSessionUser ?? {...defaultSessionData} );
    const [loading, setLoading] = useState(true);
    const [apiUp, setApiUp] = useState(true);
    const [mode, setMode] = useState(appMode);

    const [cookiesChoices, setCookiesChoices] = useState(acceptedCookies ?? defaultCookiesChoices)
    const [choiceHasToBeMade, setChoiceHasToBeMade] = useState(!acceptedCookies?.choiceMade ?? true);

    const saveCookieChoices = async (choices) => {
        await csSaveCookieChoices(choices);
        setCookiesChoices(choices);

        if (!choices.auth) {
            await logOutUser();
        }
    };

    const logOutUser = async () => {
        const logOutResponse = await fetchInternalApi("/api/logout", JSON.stringify({}));
        setUser(logOutResponse.user);
    }

    useApi(setApiUp);

    return (
        <AuthContext.Provider value={{
            user: user,
            setUser: setUser,
            logOutUser: logOutUser,
            loading: loading,
            setLoading: setLoading,
            apiUp : apiUp,
            setApiUp : setApiUp,
            mode: mode,
            setMode: setMode,
            cookiesChoices: cookiesChoices,
            setCookiesChoices: setCookiesChoices,
            saveCookieChoices: saveCookieChoices,
            choiceHasToBeMade: choiceHasToBeMade,
            setChoiceHasToBeMade: setChoiceHasToBeMade,

        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}





//AuthProvider inspired by https://stackoverflow.com/questions/71498723/next-js-how-to-use-usestate-and-authcontext-without-invalidating-ssg-html //seem nice.https://solveforum.com/forums/threads/solved-cannot-destructure-property-of-object-from-context.520739/