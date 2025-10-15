import { createContext } from "react";

export const MessageContext = createContext({
    addMessage:
        /**
         * @type {({ text: string, positive: boolean }) => void}
         */
        () => {},
});
