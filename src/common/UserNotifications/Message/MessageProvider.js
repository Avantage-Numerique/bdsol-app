import { createContext, useContext, useState } from "react";
import { currentTime } from "@/src/helpers/dates";

export const MessageContext = createContext(undefined);

/**
 * @typedef {Object} Message
 * @property {string} text - The message text to display
 * @property {'positive'|'negative'|'primary'|'secondary'} theme - The visual theme of the message
 * @property {number} creationTime - Timestamp when the message was created
 */

/**
 * @typedef {Object} MessageContextValue
 * @property {function(Message|string): void} addMessage - Adds a new toast message to the queue
 * @property {Message[]} messages - Array of current toast messages
 * @property {React.Dispatch<React.SetStateAction<Message[]>>} setMessages - React setState function to update messages array
 */

/**
 * @typedef {JSX.Element} MessageProvider
 * @property {function(Message|string): void} addMessage - Adds a new toast message to the queue
 * @property {Message[]} messages - Array of current toast messages
 * @property {function(Message[]): void} setMessages - React setState function to update messages array
 */

/**
 * Manage the toat message of the application from within the provider and used outside with the useMessages().
 * @param {React.ReactNode} children
 * @returns {JSX.Element}
 * @constructor
 */
const MessageProvider = ({ children }) => {
    //message list
    const [messages, setMessages] = useState([]);

    /**
     * Adds a toast message to the application's message queue.
     *
     * @param {Message|string} newMessage - Message object or string text
     * @param {string} newMessage.text - The message text (if object is passed)
     * @param {'positive'|'negative'|'primary'|'secondary'} [newMessage.theme='positive'] - Visual theme
     * @returns {void}
     *
     * @example
     * addMessage({ text: 'Item saved!', theme: 'positive' });
     * addMessage('Simple message'); // Uses default positive theme
     */
    const addMessage = (newMessage) => {
        const messagesQueue = [...messages];
        messagesQueue.push({
            text: newMessage.text ?? newMessage,
            theme: newMessage.theme ?? "positive",
            creationTime: currentTime(),
        });
        setMessages(messagesQueue);
    };

    return <MessageContext.Provider value={{ addMessage, messages, setMessages }}>{children}</MessageContext.Provider>;
};

/**
 * Hook to use the message Context.
 * @returns {MessageContextValue} The message context
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
