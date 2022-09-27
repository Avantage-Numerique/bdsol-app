

//Component 
import CreatePersonForm from '../../../DataTypes/Person/Components/Forms/CreatePerson/CreatePersonForm'
import Button from '../../../app/common/FormElements/Buttons/Button/Button'

//Styling 
import styles from './createPerson.module.scss'
import {lang} from "../../../app/common/Data/GlobalConstants";
import SanitizedInnerHtml from "../../../app/utils/SanitizedInnerHtml";
import {withSessionSsr} from "../../../authentication/session/handlers/withSession";
import {ssrCanAccess} from "../../../authentication/permissions/ssrCanAccess";
import CreateTaxonomyForm from "../../../DataTypes/Taxonomy/Components/Forms/CreateTaxonomy/CreateTaxonomyForm";
import SingleViewEntityFormLayout
    from "../../../DataTypes/common/layouts/SingleViewEntityFormLayout/SingleViewEntityFormLayout";
import React from "react";

const CreatePersonPage = () => {

    return (
        <SingleViewEntityFormLayout formName={"person"} headerProps={{
            title: lang.Personnes,
            subTitle: lang.formPersonsSubtitle,
            description: lang.formPersonsInstructions,
            colWidth: 8,
            historyBack: {
                uri: "/contribuer",
                label: lang.historyBack
            }
        }}>
            <CreatePersonForm />
        </SingleViewEntityFormLayout>
    )

}

export const getServerSideProps = withSessionSsr(ssrCanAccess);

export default CreatePersonPage