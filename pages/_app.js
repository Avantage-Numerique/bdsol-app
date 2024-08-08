import React, {useEffect} from "react";
import {getIronSession} from "iron-session";
import App from "next/app";
import {appDefaultSessionOptions} from "@/src/authentification/session/Session";
import {AuthProvider} from '@/src/authentification/context/auth-context';
import Layout from '@/src/layouts/Layout';
import {getVisitorDataFromContext} from "@/src/authentification/context/visitor-context";
import {verifyToken} from "@/auth/callbacks/verify-token.callback";
import CookieBanner from "@/common/widgets/CookieBanner/CookieBanner";
/**
 * Import global SCSS files
 */
import '@/styles/main.scss';
import useWebStats from "@/src/monitoring/hooks/useWebStats";


// Extends basic Javascript for the project.
// import "@/src/helpers/ExtendedString";

function MyApp({Component, pageProps, user, serverCookiesChoices}) {

    const webStats = useWebStats();
    const cookieCHoices = serverCookiesChoices;

    useEffect(() => {
        webStats.init(cookieCHoices);
    }, []);
    /**
     * Main app render.
     */
    return (
        <>
            {/* Authentication context provided to all the subsequent elements */}
            <AuthProvider fromSessionUser={user} appMode={process.env.MODE} acceptedCookies={serverCookiesChoices}>
                <Layout>
                    <Component {...pageProps} />
                    <CookieBanner />
                </Layout>
            </AuthProvider>
        </>
    )
}

/**
 * Get info from the user that requested the uri.
 * @param context
 * @return {Promise<{pageProps: {visitor: {ip: string, browser: string}}}>}
 * @inheritDoc https://nextjs.org/docs/api-reference/data-fetching/get-initial-props
 */
MyApp.getInitialProps = async (context) => {

    const appProps = await App.getInitialProps(context);
    if (context.ctx.req && context.ctx.res) {

        let session = await getIronSession(
            context.ctx.req,
            context.ctx.res,
            appDefaultSessionOptions,
        );

        //Save the IP
        const visitor = getVisitorDataFromContext(context);

        //let cookieChoices = context.ctx.req.cookies.get("ChoixCookie");
        const cookies = context.ctx.req.cookies;
        let cookiesChoices = null;
        if (cookies?.avnuCookies) {
            cookiesChoices = JSON.parse(cookies.avnuCookies);
        }
        //if cookies auth is accepted follow with session creation.
        if (cookiesChoices?.auth) {

            const savedInSessionUser = session.user ?? {};

            if (session && session.user && session.user.token && session.user.token !== "") {
                //verify and set if the token is verified by the API
                try {
                    const serverVerificationResponse = await verifyToken(session.user.token);
                    session.user.tokenVerified = session.user.isLoggedIn = !serverVerificationResponse.error && serverVerificationResponse.data.tokenVerified;
                } catch (error) {
                    console.error("ERROR : Token verification failed");
                }
            }

            session.user = {
                ...savedInSessionUser,
                ...visitor
            };

            await session.save();
            return {
                pageProps: {
                    ...appProps,
                    user: session.user,
                    serverCookiesChoices: cookiesChoices
                },
                ...appProps,
                user: session.user,
                visitor: visitor,
                serverCookiesChoices: cookiesChoices
            };
        }

        return {
            pageProps: {
                ...appProps,
                user: null,
                serverCookiesChoices: cookiesChoices
            },
            ...appProps,
            user: null,
            visitor: visitor,
            serverCookiesChoices: cookiesChoices
        };
    }

    return appProps;
}

//it isn't call in _app : noMyApp.getServerSideProps or I didn't declare it the good way.
export default MyApp;
