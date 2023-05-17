
//Component 
import OrganisationSingleEdit from '@/src/DataTypes/Organisation/components/forms/CreateOrganisationForm/OrganisationSingleEdit'

//styling
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import {ssrCanAccess} from "@/auth/permissions/ssrCanAccess";
import SingleViewEntityFormLayout from "@/DataTypes/common/layouts/SingleViewEntityFormLayout/SingleViewEntityFormLayout";
import {lang} from "@/src/common/Data/GlobalConstants";
import React from "react";


const CreateOrganisationPage = () => {

    return (
        <SingleViewEntityFormLayout formName={"organisation"} headerProps={{
            title: lang.Organisation,
            subTitle: lang.formOrganisationSubtitle,
            subtitleColor: "primary",
            description: lang.formOrganisationInstructions,
            historyBack: {
                uri: "/contribuer",
                label: lang.historyBack
            }
        }}>
            <OrganisationSingleEdit />
        </SingleViewEntityFormLayout>
    )
}

export const getServerSideProps = withSessionSsr(ssrCanAccess);

export default CreateOrganisationPage