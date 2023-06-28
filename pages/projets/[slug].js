import React from 'react'

import {
    externalApiRequest
} from '@/src/hooks/http-hook';


//components
import ProjectSingleView from "@/src/DataTypes/Project/layouts/single/ProjectSingleView"
import {getUserHeadersFromUserSession} from "@/auth/context/auth-context";
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import AppRoutes from "@/src/Routing/AppRoutes";


const SingleProjectViewPage = props => {

    return (
        <div className={`single-container single-organisation`}>
            <div className="maxWidthPageContainer">
                <ProjectSingleView data={props} route={AppRoutes.projectSingle} />
            </div>
        </div>
    )
}
    
export default SingleProjectViewPage;

export const getServerSideProps = withSessionSsr(projectSlugSSProps);

export async function projectSlugSSProps(context) {
    const { slug } = context.query;

    const response = await externalApiRequest(
        `/projects/${slug}`,
        {
            method: 'GET',
            headers: getUserHeadersFromUserSession(context.req.session.user)
        });

    if(response.data._id == undefined)
        return { notFound: true };
        
    return { props: response.data };
}


