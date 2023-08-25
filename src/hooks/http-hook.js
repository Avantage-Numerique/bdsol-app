import {useCallback, useEffect, useRef, useState} from 'react';
import {getUserHeadersFromUserSession, useAuth} from '@/auth/context/auth-context'
import {lang} from "@/src/common/Data/GlobalConstants";

/**
 * Fetch the external API with all the speficity of Server Side and Client side
 * Version 2 of sendExternalApiRequest. It used params intead of infinite function parameters.
 * @param path {string}
 * @param params {{headers: {}, method: string, additionnalFetchParams: {}, origin: string, context: undefined, isBodyJson: boolean, body: string, withAuth:boolean}}
 * @return {Promise<*>}
 */
export const externalApiRequest = async (path, params = {}) => {

    params.isBodyJson = params.isBodyJson === undefined ? true : params.isBodyJson;//par défault tout est JSON

    const baseApiRoute = params.origin === "browser" ? process.env.NEXT_PUBLIC_API_URL : process.env.FROMSERVER_API_URL,
        baseAppRoute = params.origin === "browser" ? process.env.NEXT_PUBLIC_APP_URL : process.env.FROMSERVER_APP_URL;

    const defaultHeaders = { 'Origin': baseAppRoute },
        jsonHeaders = params.isBodyJson ? {'Content-Type': 'application/json'} : {};

    let headers = params.headers ?? {};

    // add user header if context is set.
    if (params.context && params.context.req && params.context.req.session && params.context.req.user) {
        headers = {
            ...headers,
            ...getUserHeadersFromUserSession(params.context.req.session.user, params.withAuth === true)
        }
    }

    // build the header array
    const headerParams = {
            ...defaultHeaders,
            ...jsonHeaders,
            ...headers
        };

    params.additionnalFetchParams = params.additionnalFetchParams ?? {};

    try {
        //   Use the fetch request with the url (required) and with its options object filled with the full data that we want to pass, if so.
        const response = await fetch(baseApiRoute + path, {
            method: params.method ?? "POST",
            body: params.body ?? undefined,
            headers: new Headers(headerParams),
            ...params.additionnalFetchParams
        });

        //Return the data
        return await response.json();

    } catch (err) {
        throw err;
    }
}


/**
 * Fetch the external API with all the speficity of Server Side and Client side but with origin force to browser;
 * Version 2 of sendExternalApiRequest. It used params intead of infinite function parameters.
 * @param path {string}
 * @param params {{headers: {}, method: string, additionnalFetchParams: {}, origin: string, context: undefined, isBodyJson: boolean, body: string, withAuth:boolean}} origin is defaulted to browser.
 * @return {Promise<*>}
 */
export const clientSideExternalApiRequest = async (path, params = {}) => {
    params.origin = "browser";
    return await externalApiRequest(path, params);
}



//Main hook function called for every request made to the database
export const useHttpClient = () => {

    //State that determine if the request is in progress
    const [isLoading, setIsLoading] = useState(false);

    //Access the authentication context
    const auth = useAuth();

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(

        //Main request function with pre-determined values
        async (path, method = 'GET', body = null, headers = {}, params={}) => {

            //Start the loading component
            setIsLoading(true);

            const stringnifyBody = params.isBodyJson && typeof body === "object" && typeof body !== "string";

            const httpAbortCtrl = new AbortController(),
                usersHeaders = getUserHeadersFromUserSession(auth.user, true),//authentification, fowarded-from, user-agent.
                headersParams = {
                    ...usersHeaders,
                    ...headers
                };
            activeHttpRequests.current.push(httpAbortCtrl);

            try {

                const responseData = await clientSideExternalApiRequest(
                    path,
                    {
                        method: method,
                        body: (stringnifyBody ? JSON.stringify(body) : body),
                        headers: headersParams,
                        additionnalFetchParams: {signal: httpAbortCtrl.signal},
                        ...params
                    }
                );

                //Remove the abort controler now that the response has been received
                activeHttpRequests.current = activeHttpRequests.current.filter(
                    reqCtrl => reqCtrl !== httpAbortCtrl
                );

                setIsLoading(false);

                return responseData;

            } catch (err) {

                //Remove the loading state
                setIsLoading(false);

                //Default return value
                return {
                    error: true,
                    code: 504,
                    message: lang.fetchErrorMessage,//"Une erreur est survenue et le serveur ne semble pas répondre. Assurez-vous d'avoir une connexion."
                }
            }
        },
        []
    );

    useEffect(() => {
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);

    return {isLoading, setIsLoading, sendRequest};
};