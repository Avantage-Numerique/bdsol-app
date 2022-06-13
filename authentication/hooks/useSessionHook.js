import { useContext } from 'react'

/*
*
*   Specific function to be call everytime
*   we want to login or logout of the api
*
*/

//Context
import { AuthContext } from '../context/auth-context'
import { MessageContext } from '../../app/common/UserNotifications/Message/Context/Message-Context'

//Custom hooks
import { useHttpClient } from '../../app/hooks/http-hook'

export const useSessionHook = () => {

    //Import the authentication context to make sure the user is well connected
    const auth = useContext(AuthContext);

    //Import message context 
    const msg = useContext(MessageContext);

    //Extract the functions inside useHttpClient
    const {isLoading, sendRequest} = useHttpClient();

    const logout = async () => {

        //Make sure the user is logged in before sending the request
        if(auth.isLoggedIn){

            //Temporary
            try{

                auth.logout()  

                msg.addMessage({ 
                    text: "Félicitation ! Vous avez bien été déconnectés.",
                    positive: true
                })

            } catch (err){
                msg.addMessage({ 
                    text: "Une erreur est survenue lors de la déconnection",
                    positive: false 
                })
            }

/**************** To be activated when the backend will be ready *******************

            //Send the request to logout and wait the answer
            const response = await sendRequest(
                "/logout",
                'POST',
                {},
                { 'Content-Type': 'application/json' }
            )

            //
            //    Display a message to the user relative based
            //    on the answer of the api
            //
           
            //If positive
            if(!response.error){

                //Remove the connection from the context
                //Erase the token il localstorage
                auth.logout()

                //Notify the user
                msg.addMessage({ 
                    text: response.message,
                    positive: true 
                })

            //If negative
            } else {                    
                msg.addMessage({ 
                    text: response.message,
                    positive: false 
                })
            }
*/

        } else {
            msg.addMessage({ 
                text: "Vous avez déjà été déconnecté.",
                positive: false
            })
        }
    }

    const login = async (data) => {

        //Make sur the use is not logged in.
        //Prevent useless request
        if(!auth.isLoggedIn){

            //Send the request with the specialized hook
            const response = await sendRequest(
                "/login",
                'POST',
                JSON.stringify(data),
                { 'Content-Type': 'application/json' }
            )

            //If the answer is positive
            if(!response.error) {

                //Accept the user
                auth.login(response.data.user);

                //Alert the user
                msg.addMessage({ 
                    text: response.message,
                    positive: true 
                })

            //If it is not positive for any reason
            } else {                    

                //Inform the user
                msg.addMessage({ 
                    text: response.message,
                    positive: false 
                })
            }

        } else {

            //Tell the user he is already logged in
            msg.addMessage({ 
                text: "Vous êtes déjà connecté.",
                positive: false
            })

        }
        
    }
    
    return {logout, login, isLoading}
}

