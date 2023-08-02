
//Component 
import CreateTaxonomyForm from '@/DataTypes/Taxonomy/components/Forms/CreateTaxonomy/CreateTaxonomyForm'


//Styling
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import {ssrCanAccess} from "@/auth/permissions/ssrCanAccess";
import React from "react";
import SingleViewEntityFormLayout
    from "@/DataTypes/common/layouts/SingleViewEntityFormLayout/SingleViewEntityFormLayout";
import {lang} from "@/src/common/Data/GlobalConstants";


const CreateTaxonomyPage = () => {

    return (
        <SingleViewEntityFormLayout formName={"taxonomy"} headerProps={{
            title: "Catégorie",
            subTitle: "Ajouter une nouvelle catégorie pour classifier les données",
            subtitleColor: "primary",
            historyBack: {
                uri: "/contribuer",
                label: lang.historyBack
            }
        }}>
            <CreateTaxonomyForm initValues={{}} />
        </SingleViewEntityFormLayout>
    )
}

export const getServerSideProps = withSessionSsr(ssrCanAccess);

export default CreateTaxonomyPage