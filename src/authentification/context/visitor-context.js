import {createContext} from 'react';
import { headers } from 'next/headers'

export const visitorContextDefaults = {
    ip: "",
    browser: ""
};

export const VisitorContext = createContext(visitorContextDefaults);

export const setVisitorData = (data) => {
    VisitorContext.ip = data.id;
    //VisitorContext.browser = data.welcome;
}

export const getVisitorDataFromContext = async (context) => {
    const {ctx} = context;
    return await getVisitorDataFromRequest(ctx.req);
}

export const getVisitorDataFromRequest = async (request) => {
    const visitor = visitorContextDefaults;

    visitor.ip = await getVisitorIpFromHeaders(request);
    visitor.browser = await getVisitorBrowserFromHeaders(request);

    return visitor;
}

/**
 * Parse the request header to get the visitor IP from it.
 * @param request
 * @returns {*|undefined}
 */
export const getVisitorIpFromHeaders = async (request) => {
    const headerList = await headers();
    console.log('getVisitorIpFromHeaders', request.headers);
    return request.ip ||
        headerList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        headerList.get('x-real-ip') ||
        headerList.get('cf-connecting-ip') || // Cloudflare
        headerList.get('x-client-ip') ||
        undefined;
}

/**
 * Get the visitor browser from the header.
 * @param request
 * @returns {number|*|undefined}
 */
export const getVisitorBrowserFromHeaders = async (request) => {
    const headerList = await headers();
    return request["user-agent"] ||
        headerList.get('user-agent') ||
        undefined;
}


/**
 * @deprecated Moved to the map get() method, request headers are sets in map.
 * @param request
 * @returns {undefined|string}
 */
export const getVisitorIpFromRequest = (request) => {
    if (request) {
        if (request.headers["x-forwarded-for"]) {
            return request.headers["x-forwarded-for"].split(',')[0];
        }

        if (request.headers["x-real-ip"] && req.socket) {
            return request.socket.remoteAddress;
        }

        if (request.socket && request.socket.remoteAddress) {
            return request.socket.remoteAddress;
        }
    }
    return undefined;
}

/**
 * @deprecated Moved to the map get() method, request headers are sets in map.
 * @param request
 * @returns {undefined|*}
 */
export const getVisitorBrowserFromRequest = (request) => {
    if (request) {
        if (request.headers["user-agent"]) {
            return request.headers["user-agent"];
        }
    }
    return undefined;
}