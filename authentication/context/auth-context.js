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

export const AuthContext = createContext(defaultSessionData);

