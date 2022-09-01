import { createContext } from 'react';

export const visitorContextDefaults = {
    ip: "not set",
    browser: "not set",
    req: {},
    messages: "Hi there from initial context",
};

export const VisitorContext = createContext(visitorContextDefaults);


export const setVisitorData = (data) => {
    VisitorContext.ip = data.id;
    VisitorContext.req = data.req;
    VisitorContext.welcome = data.welcome;
}

export const getVisitorData = (context) => {
    const visitor = visitorContextDefaults;
    const {req} = context;

    if (req) {

        if (req.headers["x-forwarded-for"]) {
            visitor.ip = req.headers["x-forwarded-for"].split(',')[0];
        }

        if (req.headers["x-real-ip"]) {
            visitor.ip = req.connection.remoteAddress;
        }

        if (req.connection.remoteAddress) {
            visitor.ip = req.connection.remoteAddress;
        }
    }
    return visitor;
}