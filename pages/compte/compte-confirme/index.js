import React from 'react'
import PageMeta from "@/src/common/PageMeta/PageMeta";

import AuthenticationMessage from '@/auth/components/Commons/AuthenticationMessage/AuthenticationMessage'


import styles from './CompteConfirme.module.scss'

const CompteConfirme = () => {

    return (
        <section className={` ${styles.compteConfirmePage}`}>
            <PageMeta 
                title={"Compte confirmé"}
                preventIndexation
            />
            <AuthenticationMessage 
                header="Félicitations" 
                message="Votre compte a bien été créé. Vous pouvez y accéder avec le lien ci-dessous."
                link="/compte"
            />
        </section>
    );
}

export default CompteConfirme