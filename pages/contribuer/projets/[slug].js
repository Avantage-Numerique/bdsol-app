import React from "react";
import { sessionContextInjector } from "@/auth/session/handlers/withSession";
import AppRoutes from "@/src/Routing/AppRoutes";
import ProjectSingleEdit from "@/src/DataTypes/Project/layouts/single/ProjectSingleEdit";
import { ssrCanContributeToEntity } from "@/auth/permissions/ssrCanContributeToEntity";

const SingleProjectPage = (props) => {
    return (
        <div className={`single-organisation`}>
            <ProjectSingleEdit data={props} route={AppRoutes.projectSingle} />
        </div>
    );
};
export default SingleProjectPage;

export const getServerSideProps = sessionContextInjector(ssrCanContributeToEntity("projects"));
