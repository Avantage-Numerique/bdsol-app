
import {useState, useCallback, useRef, useEffect} from 'react';
import {getUserHeadersFromUserSession, useAuth} from '@/auth/context/auth-context'
import {lang} from "@/src/common/Data/GlobalConstants";
import {pingExternalApi} from "@/src/api/external/callbacks/pingExternalApi";


/**
 * Main function to manage fetching data from the main API.
 * @param path {string} what is the API path we are targetting.
 * @param method {string} the http method GET, POST, etc.
 * @param body {object} If it's in post, do we need to pass data ?
 * @param headers {object} By default it add the conten
 * @param additionnalFetchParams {object}
 * @param isDataJson {boolean}
 * @param origin {string} From where the call is done. Maybe there is a way to determine if this a client or server side call ?
 *
 * URL change from the context of the call. When it's in effects, and click, the origin is the browser, when it's ssr and serveur, it's fromServer
 *
 * @return {Promise<any>}
 */
export const sendExternalApiRequest = async (path, method = 'GET', body = null, headers = {}, additionnalFetchParams={}, isDataJson=true, origin="browser") => {

    const baseApiRoute = origin === "browser" ? process.env.NEXT_PUBLIC_API_URL : process.env.FROMSERVER_API_URL,
        defaultHeaders = {
            'Origin': origin === "browser" ? process.env.NEXT_PUBLIC_APP_URL : process.env.FROMSERVER_APP_URL
        },
        jsonHeaders = isDataJson ? { 'Content-Type': 'application/json' } : {},
        headerParams = {
            ...defaultHeaders,
            ...jsonHeaders,
            ...headers
        },
        isApiUp = await pingExternalApi();

    if (isApiUp)
    {
        try {
            //   Use the fetch request with the url (required) and with its options object filled with the full data that we want to pass, if so.
            const response = await fetch(baseApiRoute + path, {
                method: method,
                body: body,
                headers: new Headers(headerParams),
                json: true,
                ...additionnalFetchParams
            });

            //Return the data
            return await response.json();

        } catch (err) {
            throw err;
        }
    }
}

/**
 * Version 2 of sendExternalApiRequest : externalApiRequest, it contains the params in an object to help build bigger needs.
 * @param path {string}
 * @param params {{headers: {}, method: string, additionnalFetchParams: {}, origin: string, context: undefined, isBodyJson: boolean, body: string}}
 * @return {Promise<*>}
 */
export const externalApiRequest = async (path, params = {}) => {

    params.isBodyJson = params.isBodyJson === undefined ? true : params.isBodyJson;

    const baseApiRoute = params.origin === "browser" ? process.env.NEXT_PUBLIC_API_URL : process.env.FROMSERVER_API_URL;
    const jsonHeaders = params.isBodyJson ? {'Content-Type': 'application/json'} : {};
    const defaultHeaders = {
            'Origin': params.origin === "browser" ? process.env.NEXT_PUBLIC_APP_URL : process.env.FROMSERVER_APP_URL
        };

    let headers = params.headers ?? undefined;
    // add user header if context is set.
    if (params.context && params.context.req && params.context.req.session && params.context.req.user) {
        headers = {
            ...headers,
            ...getUserHeadersFromUserSession(params.context.req.session.user, params.addToken === true)
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

                const responseData = await externalApiRequest(
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

    return {isLoading, sendRequest};
};