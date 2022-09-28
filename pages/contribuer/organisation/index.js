
//Component 
import CreateOrganisationForm from '../../../DataTypes/Organisation/components/forms/CreateOrganisationForm/CreateOrganisationForm'

//styling
import {withSessionSsr} from "../../../authentication/session/handlers/withSession";
import {ssrCanAccess} from "../../../authentication/permissions/ssrCanAccess";
import SingleViewEntityFormLayout
    from "../../../DataTypes/common/layouts/SingleViewEntityFormLayout/SingleViewEntityFormLayout";
import {lang} from "../../../app/common/Data/GlobalConstants";
import React from "react";


const CreateOrganisationPage = () => {

    return (
        <SingleViewEntityFormLayout formName={"organisation"} headerProps={{
            title: lang.Organisation,
            subTitle: lang.formOrganisationSubtitle,
            description: lang.formOrganisationInstructions,
            colWidth: 8,
            historyBack: {
                uri: "/contribuer",
                label: lang.historyBack
            }
        }}>
            <CreateOrganisationForm />
        </SingleViewEntityFormLayout>
    )
}

export const getServerSideProps = withSessionSsr(ssrCanAccess);

export default CreateOrganisationPage