import { useContext } from 'react'
import {AuthContext, useAuth} from '../context/auth-context'
import { MessageContext } from '../../app/common/UserNotifications/Message/Context/Message-Context'
import { useHttpClient } from '../../app/hooks/http-hook'
import {lang} from "../../app/common/Data/GlobalConstants";
import fetchInternalApi from "../../app/api/fetchInternalApi";
import {useRouter} from 'next/router';
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
    const {isLoading, sendRequest} = useHttpClient();

    const LogOutImplementedInAPI = false;

    const logout = async () => {

        //Make sure the user is logged in before sending the request
        if(auth.user.isLoggedIn){

            //Temporary
            if (!LogOutImplementedInAPI) {
                try {
                    auth.logout()
                    msg.addMessage({
                        text: lang.disconnectionSucceed,//"Félicitation ! Vous avez bien été déconnectés.",
                        positive: true
                    });

                } catch (err) {
                    msg.addMessage({
                        text: lang.errorOnDisconnecting,//"Une erreur est survenue lors de la déconnection",
                        positive: false
                    });
                }
            }


            if (LogOutImplementedInAPI) {

                //Request to logout in the API
                const response = await sendRequest(
                    "/logout",
                    'POST',
                    {},
                    { 'Content-Type': 'application/json' }
                )

                if(!response.error) {
                    auth.logout();
                }

                msg.addMessage({
                    text: response.message,
                    positive: !response.error
                });
            }

        } else {
            msg.addMessage({ 
                text: lang.youreAlreadyDisconnected,//"Vous avez déjà été déconnecté.",
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

            /*const response = await sendRequest(
                "/login",
                'POST',
                JSON.stringify(data),
                { 'Content-Type': 'application/json' }
            );*/
            try {
                const response = await fetchInternalApi("/api/login", JSON.stringify(data));
                console.log("UseSessionHook", response);

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

