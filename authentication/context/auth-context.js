import { createContext } from 'react';

export const AuthContext = createContext({ 
    isLoggedIn: false, 
    token: null,
    avatar: null,
    name: null,
    username: null,
    login: () => {}, 
    logout: () => {}
});

