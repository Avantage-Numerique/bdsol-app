import { createContext } from 'react';

export const AuthContext = createContext({ 
    isPending: false,
    isLoggedIn: false, 
    token: null,
    id: null,
    avatar: null,
    name: null,
    username: null,
    login: () => {}, 
    logout: () => {}
});

