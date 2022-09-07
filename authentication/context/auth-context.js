import { createContext } from 'react';

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
    return {
        isPending: userData.isPending,
        isLoggedIn: userData.token !== undefined && userData.token !== null,
        token: userData.token ?? null, //There must be at least a token, for now
        id: userData.id ?? null,
        avatar: userData.avatar ?? null,
        name: userData.name ?? null,
        username: userData.username ?? null,
        createdAt: userData.createdAt ?? null,
        /*ip: userData.ip ?? null,
        browser: userData.browser ?? null,
        language: userData.language ?? null,*/
    }
}

export const AuthContext = createContext(defaultSessionData);

