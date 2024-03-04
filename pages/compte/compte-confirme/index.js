import React from 'react'
import PageMeta from "@/src/common/PageMeta/PageMeta";
import {lang} from "@/common/Data/GlobalConstants";
import Button from '@/src/common/FormElements/Button/Button'


import AuthenticationMessage from '@/auth/components/Commons/AuthenticationMessage/AuthenticationMessage'


import styles from './CompteConfirme.module.scss'

const CompteConfirme = () => {

    const RedirectionButton = () => {
        return (
            <div className="d-flex mt-2">
                <Button
                    className="fw-semibold"
                    text_color="primary-darker"
                    href='compte/connexion'
                > 
                    Se connecter &#187;
                </Button>
            </div>
        )
    }

    return (
        <section className={` ${styles.compteConfirmePage}`}>
            <PageMeta 
                title={lang.compte__confirmedAccount__title}
                preventIndexation
            /> 
            <AuthenticationMessage 
                header="Félicitations" 
                message="Votre compte a bien été créé. Vous pouvez y accéder avec le lien ci-dessous."
                link="/compte"
                Added_content={RedirectionButton}
            />
        </section>
    );
}

export default CompteConfirme