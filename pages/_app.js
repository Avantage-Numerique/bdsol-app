import {getIronSession} from "iron-session";
import App from "next/app";
import {appDefaultSessionOptions} from "@/src/authentification/session/Session";
import {AuthProvider} from '@/src/authentification/context/auth-context';
import Layout from '@/src/layouts/Layout';
import {getVisitorDataFromContext} from "@/src/authentification/context/visitor-context";

/**
 * Import global SCSS files
 */
import '@/styles/main.scss';

function MyApp({Component, pageProps, user}) {

    /**
     * Main app render.
     */
    return (
        <>
            {/* Authentication context provided to all the subsequent elements */}
            <AuthProvider fromSessionUser={user}>
                <Layout>
                    <Component {...pageProps} />
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

        let { user } = await getIronSession(
            context.ctx.req,
            context.ctx.res,
            appDefaultSessionOptions,
        );

        //Save the IP
        const visitor = getVisitorDataFromContext(context);
        user = {
            ...user,
            ...visitor
        }

        return {
            pageProps: {
                ...appProps,
                user: user
            },
            ...appProps,
            user: user,
            visitor: visitor
        };
    }

    return appProps
}

//it isn't call in _app : noMyApp.getServerSideProps or I didn't declare it the good way.

export default MyApp;
