/*

        Custom hook that offer some common fonctionnalities to the the application form
        Note that the form state itself is controled by form-Hook file
*/

import React, { useState, useCallback } from 'react'

//Custom hooks
import { useHttpClient } from './http-hook'

//Custom contexts
import { AuthContext } from '../../authentication/context/auth-context'
import { MessageContext } from '../common/UserNotifications/Message/Context/Message-Context'

export const useFormUtils = () => {

    //Extract the functions inside useHttpClient to send api request
    const {isLoading, sendRequest} = useHttpClient();
    
    //Import message context 
    const msg = useContext(MessageContext);

    //State element for a message displayed inside the form
    const [localMessage, setLocalMessage] = useState();

    return {  }


}

