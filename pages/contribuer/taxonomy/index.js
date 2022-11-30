
//Component 
import CreateTaxonomyForm from '@/DataTypes/Taxonomy/Components/Forms/CreateTaxonomy/CreateTaxonomyForm'


//Styling 
import styles from './createTaxonomy.module.scss'
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import {ssrCanAccess} from "@/auth/permissions/ssrCanAccess";
import React from "react";
import SingleViewEntityFormLayout
    from "@/DataTypes/common/layouts/SingleViewEntityFormLayout/SingleViewEntityFormLayout";
import {lang} from "@/src/common/Data/GlobalConstants";


const CreateTaxonomyPage = () => {

    return (
        <SingleViewEntityFormLayout formName={"taxonomy"} headerProps={{
            title: "Taxonomie",
            subTitle: "Ajouter une nouvelle pour classifier les données",
            subtitleColor: "primary",
            historyBack: {
                uri: "/contribuer",
                label: lang.historyBack
            }
        }}>
            <CreateTaxonomyForm />
        </SingleViewEntityFormLayout>
    )
}

export const getServerSideProps = withSessionSsr(ssrCanAccess);

export default CreateTaxonomyPage