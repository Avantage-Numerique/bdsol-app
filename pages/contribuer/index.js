
//Components
import Button from "@/src/common/FormElements/Buttons/Button/Button"

//Context
import {useAuth} from '@/auth/context/auth-context'

//styling
import styles from './contribution-page.module.scss'
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import {ssrCanAccess} from "@/auth/permissions/ssrCanAccess";

import PageHeader from "@/layouts/Header/PageHeader";
import React from "react";

 
const Index = () => {

    const auth = useAuth();

    return (
        <div className={`${styles["contribution-page"]}`}>

            <PageHeader
                title={"Créer une donnée"}
                description={"Vous avez accès ici à tous les types de données qu'il est présentement possible d'intégrer à la base de données."} />

            <div className={`${styles["contribution-page__menu"]}`}>
                <div className='container p-0'>

                    { !auth.user.isLoggedIn &&
                        <div className="row">
                            <div>
                                <span className="text-danger"><strong>Attention ! </strong></span>
                                Vous devez être connecté afin de pouvoir éditer la base de données.
                            </div>
                        </div>
                    }

                    <div className='row pt-3'>
                        <div className="col">
                            <h4 className="col-12">Sélectionnez le type d'entité que vous voulez ajouter</h4>
                        </div>
                    </div>

                    <div className='row pt-3 row-cols-1 row-cols-sm-3 gy-3'>
                        <div className="col">
                            <Button href="/contribuer/personne" size="large-100" disabled={!auth.user.isLoggedIn}>Personne</Button>
                        </div>
                        <div className="col">
                            <Button href="/contribuer/organisation" size="large-100" disabled={!auth.user.isLoggedIn}>Organisation</Button>
                        </div>
                        <div className="col">
                            <Button href="/contribuer/taxonomy" size="large-100" disabled={!auth.user.isLoggedIn}>Taxonomy</Button>
                        </div>
                    </div>

                    <div className='row pt-3'>
                        <div className="col">
                            <h4 className="col-12">Entités à venir</h4>
                        </div>
                    </div>

                    <div className='row pt-3 row-cols-1 row-cols-sm-3 gy-3'>
                        <div className="col">
                            <Button href="/" size="large-100" disabled>Projet</Button>
                        </div>
                        <div className="col">
                            <Button href="/" size="large-100" disabled>Événement</Button>
                        </div>
                        <div className="col">
                            <Button href="/" size="large-100" disabled>Matériel</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export const getServerSideProps = withSessionSsr(ssrCanAccess);

export default Index