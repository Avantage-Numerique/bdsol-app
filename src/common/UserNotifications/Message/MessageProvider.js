import { createContext, useContext, useState } from "react";
import { currentTime } from "@/src/helpers/dates";

export const MessageContext = createContext(undefined);

/**
 * Manage the toat message of the application from within the provider and used outside with the useMessages().
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const MessageProvider = ({ children }) => {
    //message list
    const [messages, setMessages] = useState([]);

    const addMessage = (newMessage) => {
        console.log("addMessage", messages);
        const messagesQueue = [...messages];
        messagesQueue.push({
            text: newMessage.text ?? newMessage,
            theme: newMessage.theme ?? "positive",
            creationTime: currentTime(),
        });
        setMessages(messagesQueue);

        console.log("addMessage", messages);
    };

    return <MessageContext.Provider value={{ addMessage, messages, setMessages }}>{children}</MessageContext.Provider>;
};

/**
 * Hook to use the message Context.
 * @returns {*}
 */
const useMessages = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error("useMessages must be used within ToastProvider");
    }
    return context;
};

export default MessageProvider;

export { useMessages };
