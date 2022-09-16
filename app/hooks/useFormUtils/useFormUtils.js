/*

        Custom hook that offer some common fonctionnalities to the the application form
        Note that the form state itself is controled by form-Hook file
*/

import React, { useState, useContext, useCallback, memo } from 'react'

//Components 
import Spinner from '../../common/widgets/spinner/Spinner'

//Custom hooks
import { useHttpClient } from '../http-hook'
import { useForm } from '../form-hook'
//Custom contexts
import { AuthContext } from '../../../authentication/context/auth-context'
import { MessageContext } from '../../common/UserNotifications/Message/Context/Message-Context'


//Form UI styling
import styles from './formUI.module.scss'



export const useFormUtils = ( initialState, redirection ) => {

    //Other option of message to display
    const [innerMessage, setInnerMessage] = useState()

    //Extract the functions inside useHttpClient to send api request
    const {isLoading, sendRequest} = useHttpClient();

    //Custom hook to manage the state of the form (data)
    const [formState, formTools, clearFormData] = useForm(initialState)

    const submitRequest = async (route, type, data, header = { 'Content-Type': 'application/json' }) => {

        //Send the request with the specialized hook
        const response = await sendRequest (
            route,
            type,
            JSON.stringify(data),
            header
        )

        //If the answer is positive
        if(!response.error){
            //Alert the user
            msg.addMessage({ 
                text: response.message,
                positive: true 
            })

            if(redirection){
                //Program the redirection
            } else {
                //By default clear the form data
                clearFormData()
            }

        //If it is not positive for any reason
        } else {       

            setInnerMessage(response.message)

        }
    }
    
    //Import message context 
    const msg = useContext(MessageContext);



    const FormUI = () => {
    
        return (
            <>  
                {   
                    innerMessage &&
                    <div className={`col-12 red_BG white ${styles["data-form-message"]}`}>
                        { innerMessage }
                    </div>
                }
                { isLoading && <Spinner /> }
            </>
        )

    }

    //State element for a message displayed inside the form
    //const [localMessage, setLocalMessage] = useState();

    return { FormUI, submitRequest, formState, formTools }


}

/*

Brain storm !!!! 

    Qu'est-ce qu'on veut centraliser comme fonctions : 

        L'appel des messages externes
        L'appel des messages internes
        Effacage des formulaires lorsque nécessaires
        Toutes les autres fonctions d'édition du state
        Affichage du spinner et du message
        L'envoie de requêtes

        Si je fais toutes ces méthodes, il faut avoir
        des manières de sauter des étapes

        Options 1 : 
            Entièrement automatisée
            Gère l'envoie de requêtes et le spinner
            Pourrait automatiquement effacer le contenu du formulaire lorsque positif
            Gère les messages. 
            Pourrait avoir des input pour
            exécuter du code dans le cas d'un réponse positive
            Pourrait 

            Action :
                1. If positive, than ask for a redirection link. If there is none, by default empty the form. Answer with global message
                2. If negative, display the errors with inner message.


        Si on considère que le component de formulaire
        doit être aussi simple que possible pour être scalable
        Il pourrait justement y avoir un component 
        par dessus qui pourrait recevoir toutes les options. 

        const [formWrapper, sendRequest] = useForm() 
*/