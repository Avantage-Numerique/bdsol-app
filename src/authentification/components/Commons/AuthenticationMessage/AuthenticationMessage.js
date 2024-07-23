import React from 'react'

import styles from './AuthenticationMessage.module.scss'

const AuthenticationMessage = ({header, message, Added_content}) => {

    return (
        <article className={`header-less-page bg-primary-lighter rounded form-box-shadow ${styles.authenticationMessage}`}>

            <header className="">
                <h2 className="text-dark-light mb-4">{header}</h2>
            </header>
            <p className="m-0">
                {message}
            </p>
            {Added_content && 
                <Added_content />
            }
        </article>
    );
}


export default AuthenticationMessage