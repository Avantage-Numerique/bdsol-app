
//Component 
import PersonSingleEdit from '@/src/DataTypes/Person/Components/Forms/CreatePerson/PersonSingleEdit'

//Styling
import {lang} from "@/src/common/Data/GlobalConstants";
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import {ssrCanAccess} from "@/auth/permissions/ssrCanAccess";
import SingleViewEntityFormLayout from "@/DataTypes/common/layouts/SingleViewEntityFormLayout/SingleViewEntityFormLayout";
import React from "react";

const PersonSingleEditPage = () => {

    return (
            <PersonSingleEdit />
    )

}

export const getServerSideProps = withSessionSsr(ssrCanAccess);

export default PersonSingleEditPage