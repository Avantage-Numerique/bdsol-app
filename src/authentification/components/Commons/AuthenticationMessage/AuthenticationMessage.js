import React from "react";

import styles from "./AuthenticationMessage.module.scss";

/**
 * DRY componenent used to fill a content area in a page.
 * @param header
 * @param message
 * @param Added_content
 * @returns {JSXElement}
 * @constructor
 */
const AuthenticationMessage = ({ header, message, Added_content }) => {
    return (
        <article
            className={`header-less-page bg-primary-lighter rounded my-5 form-box-shadow ${styles.authenticationMessage}`}
        >
            <header className="">
                <h2 className="text-dark-light mb-4">{header}</h2>
            </header>
            <p className="m-0">{message}</p>
            {Added_content && <Added_content />}
        </article>
    );
};

export default AuthenticationMessage;
