import {getIronSession} from "iron-session";
import App from "next/app";
import {appDefaultSessionOptions} from "@/src/authentification/session/Session";
import {AuthProvider} from '@/src/authentification/context/auth-context';
import Layout from '@/src/layouts/Layout';
import {getVisitorDataFromContext} from "@/src/authentification/context/visitor-context";
import {verifyToken} from "@/auth/callbacks/verify-token.callback";
import {ClientErrorHandler} from "@/layouts/Errors/ClientErrorHandler";

/**
 * Import global SCSS files
 */
import '@/styles/main.scss';

// Extends basic Javascript for the project.
import "@/src/helpers/ExtendedString";

function MyApp({Component, pageProps, user}) {

    /**
     * Main app render.
     */
    return (
        <>
            {/* Authentication context provided to all the subsequent elements */}
            <AuthProvider fromSessionUser={user} appMode={process.env.MODE}>
                <ClientErrorHandler fallback={<p>Oh canard ...</p>}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ClientErrorHandler>
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
                user: session.user
            },
            ...appProps,
            user: session.user,
            visitor: visitor
        };
    }

    return appProps;
}

//it isn't call in _app : noMyApp.getServerSideProps or I didn't declare it the good way.
export default MyApp;
