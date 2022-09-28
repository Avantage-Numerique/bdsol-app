/*

        Custom hook that offer some common fonctionnalities to the the application form
        Note that the form state itself is controled by form-Hook file
*/

import React, { useState, useContext, useEffect, useCallback } from 'react'
import { scroller } from 'react-scroll'
import Router from 'next/router'

//Components 
import Spinner from '@/src/common/widgets/spinner/Spinner'

//Custom hooks
import { useHttpClient } from '../http-hook'
import { useForm } from '../form-hook'
import { MessageContext } from '@/src/common/UserNotifications/Message/Context/Message-Context'


//Form UI styling
import styles from './formUI.module.scss'



export const useFormUtils = ( initialState, actions ) => {

    //Actions to do if the form turns to be positive
    //If no parameter is entered, then apply the default value below
    //If many are selected, they'll be executed in this orther
    let positiveResponseActions = {
        clearForm: true,                        //1. "bool"     => Empty the form
        displayResMessage: true,                //2. "bool"     => Use message component to display api response message
        callbackFunction: undefined,            //3. "function" => Execute a function call back
        redirect: undefined                     //4. "String"   => redirect to another page
    }

    //If the actions parameter contains data and is of object type
    if(actions && typeof actions === 'object' && Object.keys(actions).length !== 0){

        //Then assign the wanted values and set the rest to false 
        positiveResponseActions = {
            clearForm: actions.clearForm ? actions.clearForm : false,
            displayResMessage: actions.displayResMessage ? actions.displayResMessage : false,
            callbackFunction: actions.callbackFunction ? actions.callbackFunction : undefined,
            redirect: actions.redirect ? actions.redirect : undefined
        }
    }

    //Other option of message to display
    const [innerMessage, setInnerMessage] = useState()

    //Request response 
    const [requestResponse, setRequestResponse] = useState(null)

    //Extract the functions inside useHttpClient to send api request
    const {isLoading, sendRequest} = useHttpClient();

    //Custom hook to manage the state of the form (data)
    const [formState, formTools, clearFormData] = useForm(initialState)

    const submitRequest = async (route, type, data, header = { 'Content-Type': 'application/json' }) => {

        if(formState.isValid){

            //Send the request with the specialized hook
            const response = await sendRequest (
                route,
                type,
                JSON.stringify(data),
                header
            )
           
            //Store the response in state
            setRequestResponse(response)

            console.log(response)

            //If the answer is positive
            if(!response.error){

                //If a negative message has been displayed before, remove it 
                if(innerMessage)
                    setInnerMessage("")


                /*
                    Actions executed when the form is positive
                */

                //1.  the form
                if(positiveResponseActions.clearForm)
                    clearFormData()

                //2. Display a notification to the user with the api response message
                if(positiveResponseActions.displayResMessage)
                    msg.addMessage({ 
                        text: response.message,
                        positive: true 
                    })

                //3. Execute a call back function to do any other task
                if(positiveResponseActions.callbackFunction)
                    positiveResponseActions.callbackFunction(response)

                //4. Redirect the user to another page
                if(positiveResponseActions.redirect)
                    Router.push( positiveResponseActions.redirect )


            //If it is not positive for any reason
            } else {       
                setInnerMessage(response.message)
            }

        } else {

            //Prevent the form to be submitted since it's not valid.
            //Inform the user
            setInnerMessage("Attention. Le formulaire envoyé n'est pas valide. Assurez-vous que tous les champs sont bien remplis.")
            
        }

    
    }

    
    //Import message context 
    const msg = useContext(MessageContext);

    const FormUI = useCallback(({fixedSpinner}) => {

        useEffect(() => {
            if(innerMessage)
                scroller.scrollTo(styles["data-form-message"], {
                    offset: -50,
                    duration: 800,
                    delay: 0,
                    smooth: "easeInOutQuart",
                });
        }, [innerMessage])
    
        return (
            <>  
                {   
                    innerMessage &&
                    <div className={`col-12 red_BG white ${styles["data-form-message"]}`}>
                        { innerMessage }
                    </div>
                }
                { isLoading && <Spinner fixed={fixedSpinner} /> }
            </>
        )

    }, [innerMessage, isLoading])


    return { 
        FormUI,
        submitRequest,
        formState,
        formTools, 
        requestResponse
    }

}
