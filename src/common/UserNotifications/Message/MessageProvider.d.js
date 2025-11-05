/**
 * @typedef {Object} MessageContextValue
 * @property {function(Message|string): void} addMessage - Adds a new toast message to the queue
 * @property {function(Message|string): void} addFlashMessage - Adds a new message in the cookie to the queue
 * @property {function(): void} removeAllFlashMessages - Clear all the flash message in the cookie.
 * @property {Message[]} messages - Array of current toast messages
 * @property {Message[]} flashMessages - Array of current toast message
 * @property {React.Dispatch<React.SetStateAction<Message[]>>} setMessages - React setState function to update messages array
 */

/**
 * @typedef {JSX.Element} MessageProvider
 * @property {function(Message|string): void} addMessage - Adds a new toast message to the queue
 * @property {function(Message|string): void} addFlashMessage - Adds a new message in the cookie to the queue
 * @property {function(): void} removeAllFlashMessages - Clear all the flash message in the cookie.
 * @property {Message[]} messages - Array of current toast messages
 * @property {Message[]} flashMessages - Array of current toast message
 * @property {function(Message[]): void} setMessages - React setState function to update messages array
 */
