import {useState, useCallback, useRef, useEffect, useContext} from 'react';
import {AuthContext} from '../../authentication/context/auth-context'
import {lang} from "../common/Data/GlobalConstants";


/**
 * Main function to manage fetching data from the main API.
 * @param path {string} what is the API path we are targetting.
 * @param method {string} the http method GET, POST, etc.
 * @param body {object} If it's in post, do we need to pass data ?
 * @param headers {object}
 * @param additionnalFetchParams {object}
 * @return {Promise<any>}
 */
export const sendApiRequest = async (path, method = 'GET', body = null, headers = {}, additionnalFetchParams={}) => {

    const baseApiRoute = process.env.APP_PROTOCOLE + process.env.API_URL,
        defaultHeaders = {
            'Origin': process.env.APP_URL//'http://localhost:3000'
        },
        headerParams = {
            ...defaultHeaders,
            ...headers
        };

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

//Main hook function called for every request made to the database
export const useHttpClient = () => {

    //State that determine if the request is in progress
    const [isLoading, setIsLoading] = useState(false);

    //Access the authentication context
    const auth = useContext(AuthContext);

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(

        //Main request function with pre-determined values
        async (path, method = 'GET', body = null, headers = {}) => {

            //Start the loading component
            setIsLoading(true);

            const httpAbortCtrl = new AbortController(),
                authorization = auth.token ? {Authorization: 'Bearer ' + auth.token} : {},
                headersParams = {
                    ...authorization,
                    ...headers
                };

            activeHttpRequests.current.push(httpAbortCtrl)

            try {

                const responseData = await sendApiRequest(
                    path,
                    method,
                    body,
                    headersParams,
                    {signal: httpAbortCtrl.signal}
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