
/**
 * Call internal URI into the nextjs API routes.
 * @param internalURI
 * @param data
 * @param method
 * @return {Promise<any>}
 * initialu copied from : https://github.com/vvo/iron-session/blob/main/examples/next.js/lib/fetchJson.js
 */

export default async function fetchInternalApi(internalURI, data, method = 'POST') {

    const internalDefaultHeaders = {
        //'Origin': process.env.NEXT_PUBLIC_APP_URL,//no cors implemented yet for internals calls.
        'Content-Type': 'application/json'
    };
    console.log(process.env.NEXT_PUBLIC_APP_API_URL + internalURI, process.env.NEXT_PUBLIC_APP_URL);
    // =>       <------http://localhost:3000/api/login---------->  <----http://localhost:3000----->

    const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + internalURI, {
        method: method,
        body: data,
        headers: new Headers(internalDefaultHeaders),
        json: true
    });

    const responseParsed = await response.json();

    if (!response.error) {
        return responseParsed;
    }

    throw new FetchError({
        message: response.statusText,
        response,
        responseParsed,
    });
}


/**
 * Handle internal API with a single type error handler.
 */
export class FetchError extends Error {
    response;
    data;
    constructor({ message, response, data }) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(message);

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, FetchError);
        }

        this.name = "FetchError";
        this.response = response;
        this.data = data ?? { message: message };
    }
}