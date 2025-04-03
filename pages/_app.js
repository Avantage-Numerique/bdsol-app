import React, {useEffect} from "react";
import App from "next/app";
import {getIronSession} from "iron-session";
import {appDefaultSessionOptions, choicesSessionOptions} from "@/src/authentification/session/Session";
import {AuthProvider} from '@/src/authentification/context/auth-context';
import Layout from '@/src/layouts/Layout';
import {getVisitorDataFromContext} from "@/src/authentification/context/visitor-context";
import {verifyToken} from "@/auth/callbacks/verify-token.callback";
import CookieBanner from "@/common/widgets/CookieBanner/CookieBanner";
import useWebStats from "@/src/monitoring/hooks/useWebStats";
import "@/src/helpers/ExtendedString";

import '@/styles/main.scss';

function AVNU({Component, pageProps, user, serverCookiesChoices}) {

    const webStats = useWebStats();
    const cookieChoices = serverCookiesChoices;

    useEffect(() => {
        webStats.init(cookieChoices);
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
AVNU.getInitialProps = async (context) => {

    const appProps = await App.getInitialProps(context);

    if (context.ctx.req && context.ctx.res) {

        const { req, res } = context.ctx;

        try {
            console.log("options", appDefaultSessionOptions);
            const session = await getIronSession(req, res, appDefaultSessionOptions);
            //const cookieChoices = await getIronSession(req, res, choicesSessionOptions);

            //Save the IP and other anonymous data for the visitor.
            const visitor = getVisitorDataFromContext(context);

            //let cookieChoices = context.ctx.req.cookies.get("ChoixCookie");
            const cookies = req.cookies;
            let avnuCookies = null;
            if (cookies) {
                avnuCookies = JSON.parse(cookies.avnuCookies);
            }

            console.log("session", session, "avnuCookies", avnuCookies);
            //if cookies auth is accepted follow with session creation.
            if (avnuCookies?.auth) {

                const savedInSessionUser = session.user ?? {};

                if (session && session.user && session.user.token && session.user.token !== "") {
                    //verify and set if the token is verified by the API
                    const serverVerificationResponse = await verifyToken(session.user.token);
                    session.user.tokenVerified = session.user.isLoggedIn = !serverVerificationResponse.error && serverVerificationResponse.data.tokenVerified;

                }

                session.user = {
                    ...savedInSessionUser,
                    ...visitor
                };

                if (typeof session.save === "function") {
                    console.log("session", session, "save is function");
                    await session.save();
                }

                return {
                    pageProps: {
                        ...appProps,
                        user: session.user,
                        serverCookiesChoices: avnuCookies
                    },
                    ...appProps,
                    user: session.user,
                    visitor: visitor,
                    serverCookiesChoices: avnuCookies
                };
            }

            //If not auth setup.
            return {
                pageProps: {
                    ...appProps,
                    user: null,
                    serverCookiesChoices: avnuCookies
                },
                ...appProps,
                user: null,
                visitor: visitor,
                serverCookiesChoices: avnuCookies
            };

        } catch (error) {
            console.error('Session error:', error);
            return  {
                pageProps: {
                    ...appProps,
                    user: null,
                    serverCookiesChoices: null
                },
                user: null,
                visitor: null,
                serverCookiesChoices: null
            };
        }
    }

    return appProps;
}

//it isn't call in _app : noMyApp.getServerSideProps or I didn't declare it the good way.
export default AVNU;
