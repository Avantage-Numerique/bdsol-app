import React from "react";

//components
import Button from "@/src/common/FormElements/Button/Button"

//Context
import {useAuth} from '@/auth/context/auth-context'

//styling
import styles from './contribution-page.module.scss'
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import {ssrCanAccess} from "@/auth/permissions/ssrCanAccess";

import PageHeader from "@/layouts/Header/PageHeader";

//Entities
import Person from "@/DataTypes/Person/models/Person";
import Organisation from "@/DataTypes/Organisation/models/Organisation";
import Project from "@/DataTypes/Project/models/Project";


const Index = () => {

    const auth = useAuth();

    //Function to return the path to the page of creation of an entity, depending on location
    const getCreateEntityPath = (type) => {
        let model;
        //@todo need DRY and verification for using "TYPE_PERSON", TYPE_ is a constant with a string value of the type.
        if(type == "TYPE_PERSON")
            model = new Person({})
        if(type == "TYPE_ORGANISATION")
            model = new Organisation({})
        if(type == "TYPE_PROJECT")
            model = new Project({})
        return model.createRoute.asPath;
    }

    return (
        <div className={`${styles["contribution-page"]}`}>

            <PageHeader
                title="Contribuer en ajoutant une entité"
                subtitleColor="primary"
                description="Vous pouvez créer ces différents types de données."
            />

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

                    <div className='row pt-5 pb-3'>
                        <div className="col">
                            <h2 className="col-12">Ajouter une : </h2>
                        </div>
                    </div>

                    <div className='row pb-5 row-cols-1 row-cols-md-4 gy-3'>
                        <div className="col">
                            <Button href={getCreateEntityPath("TYPE_PERSON")} size="large-100" disabled={!auth.user.isLoggedIn}>Personne</Button>
                        </div>
                        <div className="col">
                            <Button href={getCreateEntityPath("TYPE_ORGANISATION")} size="large-100" disabled={!auth.user.isLoggedIn}>Organisation</Button>
                        </div>
                        <div className="col">
                            <Button href="/contribuer/categorie" size="large-100" disabled={!auth.user.isLoggedIn}>Catégorie</Button>
                        </div>
                        <div className="col">
                            <Button href={getCreateEntityPath("TYPE_PROJECT")} size="large-100" disabled={!auth.user.isLoggedIn}>Projet</Button>
                        </div>
                    </div>
                    {
                        /* Retrait de "entité à venir" pour faire clean avec les tests user
                        <div className='row pt-5 pb-3'>
                            <div className="col">
                                <h2 className="col-12">Entités à venir</h2>
                            </div>
                        </div>

                        <div className='row pb-5 row-cols-1 row-cols-md-4 gy-3'>
                            <div className="col">
                                <Button href="/" size="large-100" disabled>Événement</Button>
                            </div>
                            <div className="col">
                                <Button href="/" size="large-100" disabled>Matériel</Button>
                            </div>
                        </div>
                        */
                    }
                </div>
            </div>
        </div>
    )

}
export const getServerSideProps = withSessionSsr(ssrCanAccess);

export default Index