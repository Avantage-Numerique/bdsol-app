/*

    General structure of a page 
    V.P.R - Created: 19-09-21

*/

import {createContext, useEffect, useRef, useState} from "react";
import Head from 'next/head';
import sanitizedString from "@/src/utils/SanitizedString";

//Context
import {MessageContext} from '@/src/common/UserNotifications/Message/Context/Message-Context'

//components
import Footer from '@/layouts/Footer/Footer';
import Header from '@/layouts/Header/Header';
import Message from '@/src/common/UserNotifications/Message/Message';

//Styling
import styles from './Layout.module.scss';

//Hooks
import {useModalController} from '@/src/hooks/useModal/ModalsController/ModalsController';
import {useRouter} from "next/router";
import nextConfig from "@/next.config";

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

    const metaAssetsPath = (asset, addVersion=true) => {
        const assetsVersions = nextConfig.env.VERSION;
        const basePath = "/favicon/";
        return `${basePath}${asset}${addVersion ? `?v=${assetsVersions}`:''}`;
    }

    //  Catch if uri contains a msg query vars an display it in a toast alert.
    const router = useRouter();
    useEffect(() => {
        if(router.query?.msg && router.query?.msg !== "")
        {
            const positive = router.query?.msgPositive === "true";
            setMessages([...messages, {
                    positive:positive,
                    text:sanitizedString(router.query.msg),
                    creationTime: getCurrentTime()
                }
            ])
        }
    }, [router.query]);



    return (
        <>
            <Head>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
                <meta name="language" content="fr"/>
                {/* Static for now */}

                {/* For IE 11 or earlier */}
                {/* No support for PNG favicons with 16x16 or 32x32 sizes, so use the ICO format */}
                <link rel="icon" type="image/x-icon" href={metaAssetsPath("favicon.ico")} />

                <link rel="apple-touch-icon" sizes="180x180" href={metaAssetsPath("apple-touch-icon.png")} />
                <link rel="icon" type="image/png" sizes="32x32" href={metaAssetsPath("favicon-32x32.png")} />
                <link rel="icon" type="image/png" sizes="16x16" href={metaAssetsPath("favicon-16x16.png")} />
                <link rel="apple-touch-icon" sizes="180x180" href={metaAssetsPath("apple-touch-icon.png")} />
                <link rel="icon" type="image/png" sizes="192x192" href={metaAssetsPath("android-chrome-192x192.png")} />
                <link rel="icon" type="image/png" sizes="512x512" href={metaAssetsPath("android-chrome-512x512.png")} />
                <link rel="manifest" href={metaAssetsPath("site.webmanifest")} />
                <link rel="mask-icon" href={metaAssetsPath("safari-pinned-tab.svg")}  color="#5bbad5"/>
                <meta name="msapplication-TileColor" content="#da532c"/>
                <meta name="theme-color" content="#ffffff"/>

                {/* General social medias meta tags */}
                <meta property="og:type" content="website"/>
                <meta property="og:site_name" content="AVNU"/>
                <meta property="og:locale" content="fr_CA"/>
            </Head>

            <div id={styles.layout}>
                <Header/>

                {/* Defining contextes to be passed along children */}
                <ModalContext.Provider value={{modalTools: modalTools}}>
                    <MessageContext.Provider value={{addMessage: addMessage}}>

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
                
                {/* Section where the common messages and alerts to the user are made */}
                <div className={`${styles["message-section"]}`}>

                    {/* Display the messages */}
                    { messages.map(message => (
                        <Message 
                            key={ "toast-message-" + message.creationTime }
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
                <div ref={modalContainer} id="modal-rot" >
                    {/* state containing every  */}
                </div>
            </div>
        </>
    )
}

export default Layout;


