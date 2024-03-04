import React from "react";

//components
import Button from "@/src/common/FormElements/Button/Button"
import PageMeta from "@/src/common/PageMeta/PageMeta";

//Context
import {useAuth} from '@/auth/context/auth-context'
import { lang } from "@/src/common/Data/GlobalConstants";

//styling
import styles from './contribution-page.module.scss'
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import {ssrCanAccess} from "@/auth/permissions/ssrCanAccess";

import PageHeader from "@/layouts/Header/PageHeader";

//Entities
import Person from "@/DataTypes/Person/models/Person";
import Organisation from "@/DataTypes/Organisation/models/Organisation";
import Project from "@/DataTypes/Project/models/Project";
import Event from "@/src/DataTypes/Event/models/Event";
import Equipment from "@/src/DataTypes/Equipment/models/Equipment";


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
        if(type == "TYPE_EVENT")
            model = new Event({})
        if(type == "TYPE_EQUIPMENT")
            model = new Equipment({})
        return model.createRoute.asPath;
    }

    return (
        <div className={`${styles["contribution-page"]}`}>
            <PageMeta 
                title={lang.contribute__title}
                description={lang.contribute__description}
            />
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

                    <div className='row pb-5'>
                        <div className="col-12 d-flex gap-2 gap-sm-3 gap-mg-4 gap-lg-5 flex-wrap">
                            <Button href={getCreateEntityPath("TYPE_PERSON")} disabled={!auth.user.isLoggedIn}>
                                {lang.Person}
                                <i style={{fontSize: "0.9rem"}}className={`${Person.icon} ${styles["entity-icon"]}`} />
                            </Button>
                            <Button href={getCreateEntityPath("TYPE_ORGANISATION")} disabled={!auth.user.isLoggedIn}>
                                {lang.Organisation}
                                <i className={`${Organisation.icon} ${styles["entity-icon"]}`} />
                            </Button>
                            <Button href="/contribuer/categorie" disabled={!auth.user.isLoggedIn}>
                                {lang.Taxonomy}
                            </Button>
                            <Button href={getCreateEntityPath("TYPE_PROJECT")} disabled={!auth.user.isLoggedIn}>
                                {lang.Project}
                                <i className={`${Project.icon} ${styles["entity-icon"]}`} />
                            </Button>
                            <Button href={getCreateEntityPath("TYPE_EVENT")} disabled={!auth.user.isLoggedIn}>
                                {lang.Event}
                                <i className={`${Event.icon} ${styles["entity-icon"]}`} />
                            </Button>
                            <Button href={getCreateEntityPath("TYPE_EQUIPMENT")} disabled={!auth.user.isLoggedIn}>
                                {lang.Equipment}
                                <i className={`${Equipment.icon} ${styles["entity-icon"]}`} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export const getServerSideProps = withSessionSsr(ssrCanAccess);

export default Index