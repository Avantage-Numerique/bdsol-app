import React from "react";
import { sessionContextInjector } from "@/auth/session/handlers/withSession";
import AppRoutes from "@/src/Routing/AppRoutes";
import PersonSingleEdit from "@/DataTypes/Person/components/Forms/CreatePerson/PersonSingleEdit";
import { ssrCanContributeToEntity } from "@/auth/permissions/ssrCanContributeToEntity";

const SinglePersonEditPage = (props) => {
    return <PersonSingleEdit data={props} route={AppRoutes.personSingle} />;
};

export default SinglePersonEditPage;

export const getServerSideProps = sessionContextInjector(ssrCanContributeToEntity("persons"));
