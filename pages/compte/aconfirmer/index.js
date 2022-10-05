import React from 'react'

import AuthenticationMessage from '@/auth/components/Commons/AuthenticationMessage/AuthenticationMessage'


import styles from './aconfirmer.module.scss'

const AConfirmer = () => {

    return (
        <section className={styles.aConfirmerPage}>
            <AuthenticationMessage 
                header="En attente de confirmation" 
                message="Vous devriez recevoir un courriel de confirmation sous peu. Une fois que vous aurez confirmé votre identité, vous pourrez vous connecter à votre compte."
            />
        </section>
    );
}

export default AConfirmer