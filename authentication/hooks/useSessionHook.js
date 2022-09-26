import { useContext } from 'react'
import {AuthContext, useAuth} from '../context/auth-context'
import { MessageContext } from '../../app/common/UserNotifications/Message/Context/Message-Context'
import { useHttpClient } from '../../app/hooks/http-hook'
import {lang} from "../../app/common/Data/GlobalConstants";
import fetchInternalApi from "../../app/api/fetchInternalApi";
import Router from 'next/router';

/**
 *   Specific function to be call everytime if we want to login or logout of the api
 */
export const useSessionHook = () => {

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    //Import message context 
    const msg = useContext(MessageContext);

    //Extract the functions inside useHttpClient
    const {isLoading} = useHttpClient();

    const logout = async () => {

        if(auth.user.isLoggedIn) {
            try {
                const response = await fetchInternalApi("/api/logout", JSON.stringify({}));
                auth.setUser(response.user);

                msg.addMessage({
                    text: response.text,
                    positive: response.positive
                });

                if(response.positive) {
                    //auth.login(response.data.user);
                    await Router.push(response.redirectUri);
                }

            } catch(e) {
                throw e;
            }

        } else {
            //Tell the user he is already logged in
            msg.addMessage({
                text: lang.youreAlreadyDisconnected, //"Vous êtes déjà connecté.",
                positive: false
            });
        }
    }

    /**
     * Authenfication with the API via the /login path and using sendRequest function.
     * @param data
     * @return {Promise<void>}
     */
    const login = async (data) => {

        //Prevent useless request, making sure the use is not logged in.
        if(!auth.user.isLoggedIn){

            try {
                const response = await fetchInternalApi("/api/login", JSON.stringify(data));
                auth.setUser(response.user);

                msg.addMessage({
                    text: response.text,
                    positive: response.positive
                });

                if(response.positive) {
                    //auth.login(response.data.user);
                    await Router.push(response.redirectUri);
                }

            } catch(e) {
                throw e;
            }

        } else {

            //Tell the user he is already logged in
            msg.addMessage({ 
                text: lang.youreAlreadyConnected, //"Vous êtes déjà connecté.",
                positive: false
            });
        }
    }
    
    return {logout, login, isLoading}
}

