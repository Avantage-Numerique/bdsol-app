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

export const getVisitorData = (context) => {
    const visitor = visitorContextDefaults;
    const {req} = context;

    if (req) {

        if (req.headers["x-forwarded-for"]) {
            visitor.ip = req.headers["x-forwarded-for"].split(',')[0];
        }

        if (req.headers["x-real-ip"] && req.socket) {
            visitor.ip = req.socket.remoteAddress;
        }

        if (req.socket && req.socket.remoteAddress) {
            visitor.ip = req.socket.remoteAddress;
        }
    }
    return visitor;
}