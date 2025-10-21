import { createContext, useCallback, useContext, useState } from "react";
import { currentTime } from "@/src/helpers/dates";
import styles from "@/layouts/Layout.module.scss";
import Message from "@/common/UserNotifications/Message/Message";

export const MessageContext = createContext(undefined);

const MessageProvider = ({ children }) => {
    //message list
    const [messages, setMessages] = useState([]);

    const addMessage = useCallback((newMessage) => {
        setMessages([
            ...messages,
            {
                text: newMessage,
                creationTime: currentTime(),
            },
        ]);
    }, []);

    return (
        <MessageContext.Provider value={{ addMessage, messages, setMessages }}>
            {children}
            {messages && (
                <div className={`${styles["message-section"]}`}>
                    {messages.map((message) => (
                        <Message
                            key={"toast-message-" + message.creationTime}
                            positiveReview={message.positive}
                            clean={() => {
                                setMessages((prevState) => prevState.filter((i) => i !== message));
                            }}
                        >
                            {message.text}
                        </Message>
                    ))}
                </div>
            )}
        </MessageContext.Provider>
    );
};

const useMessages = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error("useMessages must be used within ToastProvider");
    }
    return context;
};

export default MessageProvider;

export { useMessages };
