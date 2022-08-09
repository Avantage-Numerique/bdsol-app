import { createContext } from 'react';

export const AuthContext = createContext({ 
    isLoading: true,
    isLoggedIn: false, 
    token: null,
    avatar: null,
    name: null,
    username: null,
    login: () => {}, 
    logout: () => {}
});

