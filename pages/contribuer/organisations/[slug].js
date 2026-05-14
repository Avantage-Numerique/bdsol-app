import React from "react";
import { sessionContextInjector } from "@/auth/session/handlers/withSession";
import AppRoutes from "@/src/Routing/AppRoutes";
import OrganisationSingleEdit from "@/src/DataTypes/Organisation/components/forms/OrganisationSingleEdit/OrganisationSingleEdit";
import { ssrCanContributeToEntity } from "@/auth/permissions/ssrCanContributeToEntity";

const OrganisationSingleEditPage = (props) => {
    return (
        <div className={`single-organisation`}>
            <OrganisationSingleEdit data={props} route={AppRoutes.organisationSingle} />
        </div>
    );
};

export default OrganisationSingleEditPage;

export const getServerSideProps = sessionContextInjector(ssrCanContributeToEntity("organisations"));
