/*

    General structure of a page 
    V.P.R - Created: 19-09-21

*/

import {createContext, useRef, useState} from "react";
import Head from 'next/head'

//Context
import {MessageContext} from '@/src/common/UserNotifications/Message/Context/Message-Context'

//components
import Footer from '@/layouts/Footer/Footer'
import Header from '@/layouts/Header/Header'
import Nav from '@/layouts/Navigation/MainNav/Nav'
import AccountNav from '@/layouts/Navigation/AccountNav/AccountNav'
import Message from '@/src/common/UserNotifications/Message/Message'

//Styling
import styles from './Layout.module.scss'
import {FeedbackWidget} from "@/src/common/Feedbacks/components/feedback-widget";

//Hooks
import {useModalController} from '@/src/hooks/useModal/ModalsController/ModalsController'

export const ModalContext = createContext({});

const Layout = ( {children} ) => {

    /*
        State manager to manage the situation of the two menus. (Main menu and  account menu)
        Listen in the header component and update in the nav component.

        Three menu states possible : 
        0 : close
        1 : Main menu open
        2 : Account menu open
    */

    //Navigation menus in the header
    const [menuState, setMenuState] = useState(0);

    //Modal container referenve
    const modalContainer = useRef();

    //Initialize the modals controller hook
    const {ModalsDisplay, modalTools} = useModalController(modalContainer);

    //message list
    const [messages, setMessages] = useState([])

    /* Return the current time number. Used to create unique Id to each message based on the time they were send */
    const getCurrentTime = () => {
        const d = new Date()
        return d.getTime()
    }
    
    //Metthod called from other components to update the state
    const addMessage = (newMessage) => {
        setMessages([...messages, {
            ...newMessage,
            creationTime: getCurrentTime()  
        }])
    }

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
                <meta name="robots" content="index, follow" />

                {/* Icone to appear on the top of the page */}
                <link rel="icon" href="/icones/cropped-Frame-10-32x32.png" sizes="32x32" />
                <link rel="icon" href="/icones/cropped-Frame-10-192x192.png" sizes="192x192" />
                <link rel="apple-touch-icon" href="/icones/cropped-Frame-10-180x180.png" />
                <meta name="msapplication-TileImage" content="/icones/cropped-Frame-10-270x270.png" />

                <meta name="theme-color" content="#000" />

                {/* General social medias meta tags */}
                <meta property="og:type"               content="website" />
                <meta property="og:image"              content="meta-images\show_screen_shot.jpg" />
                <meta property="og:image:width"        content="2560" />
                <meta property="og:image:height"       content="1345" />
                <meta property="og:locale"             content="fr_CA" />

                <meta name="twitter:card"              content="summary_large_image"/>
                <meta name="twitter:image"             content="meta-images\show_screen_shot.jpg" />
                <meta name="twitter:image:width"       content="2560" />
                <meta name="twitter:image:height"      content="1345" />
                <meta name="twitter:image:alt"         content="Public assistant à une performance qui contient des nouvelles technologies."/>

                {/* Fonts 
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                    <link href="https://fonts.googleapis.com/css2?family=Yeseva+One&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet" />
                */}
            </Head>

            <div id={styles.layout}>
                <Header menuState={menuState} setMenuState={setMenuState} />
                <Nav menuState={menuState} setMenuState={setMenuState} />
                <AccountNav menuState={menuState} setMenuState={setMenuState} />
                
                {/* Defining contextes to be passed along children */}
                <ModalContext.Provider value={{modalTools: modalTools}}>
                    <MessageContext.Provider value={{ addMessage: addMessage }}>
                    
                    <main className={`${styles["main-container-min-height"]} container`}>
                        <div className="row">
                            <div className="col">

                                { children }

                            </div>
                        </div>
                    </main>

                    </MessageContext.Provider>
                </ModalContext.Provider>
                <Footer />


                {/*  Commented out but still there if it was to be used for another purpose 
                    <BottomBanner 
                        title="Chers et chères visiteurs"
                        para1="Travail en cours, les données ne seront pas pérennes, gardez toujours vos données en local. Nous tentons d'améliorer l'expérience dans l'application, mais elle peut changé de version en version. Merci de nous partagez votre opinons et vos observations."
                        buttonText="J'ai compris"
                    />
                */}
                
                {/* Section where the common messages and alerts to the user are made */}
                <div className={`${styles["message-section"]}`}>

                    {/* Display the messages */}
                    { messages.map(message => (
                        <Message 
                            key={ "login-message-" + message.creationTime } 
                            positiveReview={ message.positive } 
                            clean={() => { setMessages(
                                prevState => prevState.filter(i => i !== message)
                                )}}
                        >
                            {message.text}
                        </Message> 
                    )) 
                    }

                </div>

                {/* Afficher le modal */}
                <div ref={modalContainer} id="modal-rot">
                    {/* state containing every  */}
                
                </div>
            </div>
            <FeedbackWidget />
        </>
    )   

}

export default Layout;


