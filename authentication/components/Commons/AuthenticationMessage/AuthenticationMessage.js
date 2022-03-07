import React from 'react'


import styles from './AuthenticationMessage.module.scss'


const AuthenticationMessage = ({header, message}) => {


    return (
        <article className={styles.authenticationMessage}>

            <header className="col-12">
                <h2 className="blue">{header}</h2>
            </header>
            <p className="col-12">
                {message}
            </p>
        </article>
    );
}


export default AuthenticationMessage