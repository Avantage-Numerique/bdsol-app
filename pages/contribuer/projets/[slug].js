import React from 'react'

import {
    externalApiRequest
} from '@/src/hooks/http-hook';


//components
import {getUserHeadersFromUserSession} from "@/auth/context/auth-context";
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import AppRoutes from "@/src/Routing/AppRoutes";
import ProjectSingleEdit from '@/src/DataTypes/Project/layouts/single/ProjectSingleEdit';


const SingleProjectPage = props => {

    return (
        <div className={`single-organisation`}>
            <ProjectSingleEdit data={props} route={AppRoutes.projectSingle} />
        </div>
    )
}
    
export default SingleProjectPage;

export const getServerSideProps = withSessionSsr(projectSlugSSProps);

export async function projectSlugSSProps(context) {
    const { slug } = context.query;

    const response = await externalApiRequest(
        `/projects/${slug}`,
        {
            method: 'GET',
            headers: getUserHeadersFromUserSession(context.req.session.user)
        });

    return { props: response.data };
}


