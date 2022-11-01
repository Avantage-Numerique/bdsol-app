
//Component 
import CreatePersonForm from '@/DataTypes/Person/Components/Forms/CreatePerson/CreatePersonForm'

//Styling
import {lang} from "@/src/common/Data/GlobalConstants";
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import {ssrCanAccess} from "@/auth/permissions/ssrCanAccess";
import SingleViewEntityFormLayout from "@/DataTypes/common/layouts/SingleViewEntityFormLayout/SingleViewEntityFormLayout";
import React from "react";

const CreatePersonPage = () => {

    return (
        <SingleViewEntityFormLayout formName={"person"} headerProps={{
            title: lang.Persons,
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