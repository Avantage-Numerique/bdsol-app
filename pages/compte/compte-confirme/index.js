import React from 'react'

import AuthenticationMessage from '@/auth/components/Commons/AuthenticationMessage/AuthenticationMessage'


import styles from './CompteConfirme.module.scss'

const CompteConfirme = () => {

    return (
        <section className={styles.compteConfirmePage}>
            <AuthenticationMessage 
                header="Félicitations" 
                message="Votre compte a bien été créé. Vous pouvez y accéder avec le lien ci-dessous."
                link="/compte"
            />
        </section>
    );
}

export default CompteConfirme