/*

    General structure of a page 
    V.P.R - Created: 19-09-21

*/

import { createContext, useEffect, useRef } from "react";
import Head from "next/head";

//Context
import { useMessages } from "@/src/common/UserNotifications/Message/MessageProvider";

//components
import Footer from "@/layouts/Footer/Footer";
import Header from "@/layouts/Header/Header";

//Styling
import styles from "./Layout.module.scss";

//Hooks
import { useModalController } from "@/src/hooks/useModal/ModalsController/ModalsController";
import { useRouter } from "next/router";
import nextConfig from "@/next.config";
import { templates, templatesEnum } from "@/layouts/Templates/TemplatesEnum";

import Message from "@/common/UserNotifications/Message/Message";
import sanitizedString from "@/src/utils/SanitizedString";
import { currentTime } from "@/src/helpers/dates";
import { usePathname } from "next/navigation";

import { LoadingProvider } from "@/src/Navigation/LoadingContext";
import NavigationEvents from "@/src/Navigation/NavigationEvents";
import LoadingIndicator from "@/src/Navigation/LoadingIndicator";
import { csGetCookie } from "@/common/Cookies/clientSideCookies";

export const ModalContext = createContext({});

const Layout = ({ children, pageProps }) => {
    //Modal container referenve
    const modalContainer = useRef();

    //Initialize the modals controller hook
    const { modalTools } = useModalController(modalContainer);

    //message list
    const { messages, setMessages, removeAllFlashMessages } = useMessages();

    // TEMPLATE Selection, set the tempalte vars in getStaticProps from the templatesEnum
    const currentTemplate = pageProps.template
        ? templates.get(pageProps.template)
        : templates.get(templatesEnum.DEFAULT);

    const metaAssetsPath = (asset, addVersion = true) => {
        const assetsVersions = nextConfig.env.VERSION;
        const basePath = "/favicon/";
        return `${basePath}${asset}${addVersion ? `?v=${assetsVersions}` : ""}`;
    };

    //  Catch if uri contains a msg query vars an display it in a toast alert.
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const avnuFunctions = csGetCookie(process.env.APP_FUNCTIONS_COOKIE_NAME);
        if (avnuFunctions && avnuFunctions.flashMessages && avnuFunctions.flashMessages.length > 0) {
            setMessages(avnuFunctions.flashMessages);
            removeAllFlashMessages();
        }
        if (router.query?.msg && router.query?.msg !== "") {
            const positive = router.query?.msgPositive === "true";
            setMessages([
                ...messages,
                {
                    positive: positive,
                    text: sanitizedString(router.query.msg),
                    creationTime: currentTime(),
                },
            ]);

            const params = new URLSearchParams(router.query);
            params.delete("msg");
            params.delete("msgPositive");
            router.replace({ pathname, query: params.toString() }, undefined, {
                shallow: true,
            });
        }
    }, [router.query]);

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <meta name="language" content="fr" />
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
                <link rel="mask-icon" href={metaAssetsPath("safari-pinned-tab.svg")} color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />

                {/* General social medias meta tags */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="AVNU" />
                <meta property="og:locale" content="fr_CA" />
            </Head>

            <LoadingProvider>
                <NavigationEvents />
                <LoadingIndicator />
                <div id={styles.layout}>
                    <Header />

                    {/* Defining contextes to be passed along children */}
                    <ModalContext.Provider value={{ modalTools: modalTools }}>
                        <currentTemplate.Component {...currentTemplate.props}>{children}</currentTemplate.Component>
                    </ModalContext.Provider>
                    <Footer />

                    {messages && (
                        <div className={`${styles["message-section"]}`}>
                            {messages.map((message, index) => (
                                <Message
                                    key={"toast-message-" + message.creationTime}
                                    theme={message.theme}
                                    position={index + 1}
                                    clean={() => {
                                        setMessages((prevState) => prevState.filter((i) => i !== message));
                                    }}
                                >
                                    {message.text}
                                </Message>
                            ))}
                        </div>
                    )}

                    {/* Afficher le modal */}
                    <div ref={modalContainer} id="modal-rot">
                        {/* state containing every  */}
                    </div>
                </div>
            </LoadingProvider>
        </>
    );
};

export default Layout;
