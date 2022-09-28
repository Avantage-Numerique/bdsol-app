import { createContext } from 'react';

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
    const {req} = context;
    return getVisitorDataFromRequest(req);
}

export const getVisitorDataFromRequest = (request) => {
    const visitor = visitorContextDefaults;
    if (request) {

        if (request.headers["x-forwarded-for"]) {
            visitor.ip = request.headers["x-forwarded-for"].split(',')[0];
        }

        if (request.headers["x-real-ip"] && req.socket) {
            visitor.ip = request.socket.remoteAddress;
        }

        if (request.socket && request.socket.remoteAddress) {
            visitor.ip = request.socket.remoteAddress;
        }
    }
    return visitor;
}