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
import AccountNav from '@/layouts/Navigation/AccountNav/AccountNav'
import Message from '@/src/common/UserNotifications/Message/Message'

//Styling
import styles from './Layout.module.scss'

//Hooks
import {useModalController} from '@/src/hooks/useModal/ModalsController/ModalsController'
import {appUrl} from "@/src/helpers/url";

export const ModalContext = createContext({});

const Layout = ( {children} ) => {

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

                {/* For IE 11 or earlier */} 
                {/* No support for PNG favicons with 16x16 or 32x32 sizes, so use the ICO format */}
                <link rel="icon" type="image/x-icon" href="/AVNU_Branding/favicon/favicon.ico" />

                {/* For modern browsers */}
                <link rel="icon" type="image/png" sizes="16x16" href="/AVNU_Branding/favicon/favicon-16x16.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/AVNU_Branding/favicon/favicon-32x32.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/AVNU_Branding/favicon/apple-touch-icon.png" />

                {/* For Android Chrome */}
                <link rel="icon" type="image/png" sizes="192x192" href="/AVNU_Branding/favicon/android-chrome-192x192.png" />
                <link rel="icon" type="image/png" sizes="512x512" href="/AVNU_Branding/favicon/android-chrome-512x512.png" />

                <meta name="theme-color" content="#000" />

                {/* General social medias meta tags */}
                <meta property="og:type" content="website" />{/*article*/}

                <meta name="twitter:label1" content="Written by" />
                <meta name="twitter:data1" content="Author's user" />
                <meta name="twitter:label2" content="Reading time" />
                <meta name="twitter:data2" content="3 minutes (static value)" />

                <meta property="article:section" content="Technology" />
                <meta property="article:tag" content="data" />
                <meta property="article:tag" content="teachnocreatif" />

            </Head>

            <div id={styles.layout}>
                <Header />
               {/*  <AccountNav menuState={menuState} setMenuState={setMenuState} /> */}
                
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


                {/*  Commented out but still there if it was to be used for another purpose like the accepting cookie ?
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
        </>
    )   

}

export default Layout;


