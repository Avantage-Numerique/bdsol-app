import {createContext} from 'react';

export const visitorContextDefaults = {
    ip: "",
    browser: ""
};

export const VisitorContext = createContext(visitorContextDefaults);

export const setVisitorData = (data) => {
    VisitorContext.ip = data.id;
    //VisitorContext.browser = data.welcome;
}

export const getVisitorDataFromContext = (context) => {
    const {ctx} = context;
    return getVisitorDataFromRequest(ctx.req);
}

export const getVisitorDataFromRequest = (request) => {
    const visitor = visitorContextDefaults;

    visitor.ip = getVisitorIpFromRequest(request);
    visitor.browser = getVisitorBrowserFromRequest(request);

    return visitor;
}

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

export const getVisitorBrowserFromRequest = (request) => {
    if (request) {
        if (request.headers["user-agent"]) {
            return request.headers["user-agent"];
        }
    }
    return undefined;
}