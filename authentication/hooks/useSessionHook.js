import { useContext } from 'react'
import { AuthContext } from '../context/auth-context'
import { MessageContext } from '../../app/common/UserNotifications/Message/Context/Message-Context'
import { useHttpClient } from '../../app/hooks/http-hook'
import {lang} from "../../app/common/Data/GlobalConstants";
import fetchInternalApi from "../../app/api/fetchInternalApi";


/**
 *   Specific function to be call everytime if we want to login or logout of the api
 */
export const useSessionHook = () => {

    //Import the authentication context to make sure the user is well connected
    const auth = useContext(AuthContext);

    //Import message context 
    const msg = useContext(MessageContext);

    //Extract the functions inside useHttpClient
    const {isLoading, sendRequest} = useHttpClient();

    const LogOutImplementedInAPI = false;

    const logout = async () => {

        //Make sure the user is logged in before sending the request
        if(auth.isLoggedIn){

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
        if(!auth.isLoggedIn){

            /*const response = await sendRequest(
                "/login",
                'POST',
                JSON.stringify(data),
                { 'Content-Type': 'application/json' }
            );*/
            const response = await fetchInternalApi("/api/login", JSON.stringify(data));
            console.log("UseSessionHook", response);

            if(!response.error && response.data) {
                auth.login(response.data.user);
            }

            msg.addMessage({
                text: response.message,
                positive: !response.error
            });

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

