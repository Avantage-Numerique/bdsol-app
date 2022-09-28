
//Component 
import CreatePersonForm from '../../../DataTypes/Person/Components/Forms/CreatePerson/CreatePersonForm'

//Styling
import {lang} from "../../../app/common/Data/GlobalConstants";
import {withSessionSsr} from "../../../authentication/session/handlers/withSession";
import {ssrCanAccess} from "../../../authentication/permissions/ssrCanAccess";
import SingleViewEntityFormLayout
    from "../../../DataTypes/common/layouts/SingleViewEntityFormLayout/SingleViewEntityFormLayout";
import React from "react";

const CreatePersonPage = () => {

    return (
        <SingleViewEntityFormLayout formName={"person"} headerProps={{
            title: lang.Personnes,
            subTitle: lang.formPersonSubtitle,
            description: lang.formPersonInstructions,
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