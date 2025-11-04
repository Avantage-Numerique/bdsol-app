import { createContext, useContext, useState } from "react";
import { currentTime } from "@/src/helpers/dates";
import { clearFlashMessages, pushFlashMessage } from "@/common/UserNotifications/Message/FlashMessage";

export const MessageContext = createContext(undefined);

/**
 * Manage the toat message of the application from within the provider and used outside with the useMessages().
 * @param {React.ReactNode} children
 * @returns {JSX.Element}
 * @constructor
 */
const MessageProvider = ({ children, flashMessages }) => {
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

    /**
     * Ajoute un message adns
     * @param {Message|Message[]} newFlashMessage
     * @returns {Promise<void>}
     */
    const addFlashMessage = async (newFlashMessage) => {
        if (Array.isArray(newFlashMessage)) {
            await pushFlashMessage([...newFlashMessage]);
        }
        await pushFlashMessage([newFlashMessage]);
    };

    /**
     * Clear all the flash message from cookies.
     * @returns {Promise<void>}
     */
    const removeAllFlashMessages = async () => {
        await clearFlashMessages();
    };

    const checkFlashMessages = async () => {
        /*const flashMessageCookie = cookies.get(FLASHMESSAGE_COOKIE_NAME);
        if (flashMessageCookie) {
            try {
                const parsedFlashMessages = JSON.parse(flashMessageCookie);
                addMessage(parsedFlashMessages);
                cookies.remove(FLASHMESSAGE_COOKIE_NAME); // Clear after reading
            } catch (error) {
                console.error("Failed to parse flash message cookie:", error);
            }
        }*/
    };

    return (
        <MessageContext.Provider
            value={{ addMessage, messages, setMessages, addFlashMessage, flashMessages, removeAllFlashMessages }}
        >
            {children}
        </MessageContext.Provider>
    );
};

/**
 * Hook to use the message Context.
 * @returns {MessageContextValue} The message context
 */
const useMessages = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error("useMessages must be used within MessageProvider");
    }
    return context;
};

export default MessageProvider;

export { useMessages };
