
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
        'Origin': process.env.APP_API_URL,//no cors implemented yet for internals calls.
        'Content-Type': 'application/json'
    };

    const response = await fetch(process.env.APP_API_URL + internalURI, {
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