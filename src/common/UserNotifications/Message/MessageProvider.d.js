/**
 * @typedef {Object} MessageContextValue
 * @property {function(Message|string): void} addMessage - Adds a new toast message to the queue
 * @property {function(): void} checkFlashMessages - Adds a new toast message to the queue
 * @property {Message[]} messages - Array of current toast messages
 * @property {React.Dispatch<React.SetStateAction<Message[]>>} setMessages - React setState function to update messages array
 */

/**
 * @typedef {JSX.Element} MessageProvider
 * @property {function(Message|string): void} addMessage - Adds a new toast message to the queue
 * @property {Message[]} messages - Array of current toast messages
 * @property {function(Message[]): void} setMessages - React setState function to update messages array
 */
