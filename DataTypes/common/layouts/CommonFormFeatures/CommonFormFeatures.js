import React, {useState, useContext, useEffect} from 'react'

//Custom contexts
import { AuthContext } from '../../../../authentication/context/auth-context'
import { MessageContext } from '../../../../app/common/UserNotifications/Message/Context/Message-Context'

//Components
//import Spinner from '../../../../app/common/widgets/spinner/Spinner'

//costum hooks 
//import { useHttpClient } from '../../../../app/hooks/http-hook'
import {lang} from "../../../../app/common/Data/GlobalConstants";

const CommonFormFeatures = ({ children }) => {

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    //Import message context 
    const msg = useContext(MessageContext);

    //Extract the functions inside useHttpClient to send api request
    //const {isLoading, sendRequest} = useHttpClient();

    //State element for a message displayed inside the form
    const [localMessage, setLocalMessage] = useState();


   // const formattedApiRequest = 

    /*
    First of all, verify if the user is logged in.
    If he isn't, then redirect him in the connexion page
    */
    useEffect(() => {
        if(!auth.user.isLoggedIn) {
            msg.addMessage({
                text: lang.needAuthToContribute,//"Vous devez être connecté pour pouvoir contribuer à la base de données.",
                positive: false
            })
            Router.push('/compte/connexion');
        }
    }, [auth.user.isLoggedIn])

    const newChildren = React.Children.map(children, child => {

        if (React.isValidElement(child)) {
            return React.cloneElement(child, { setLocalMessage });
          }
          return child;
    })

    //Prevent from displaying is the user is not logged in or if the app doesn't know the authentication state yet
    if(auth.user.isLoggedIn)

    return (
        <>

         {/**    { isLoading && <Spinner fixed /> }

            <form>  */}

                {/* When negative, the message is shown in here instead of the global message tool */}
                <div className={`col-12 red_BG white data-form-message`}>{ localMessage && localMessage}</div> 

                { newChildren }

        </>
    )
}

export default CommonFormFeatures