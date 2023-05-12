import React from 'react'

import {
    externalApiRequest
} from '@/src/hooks/http-hook';


//components
//mport OrganisationSingle from '@/src/DataTypes/Organisation/components/layouts/single/OrganisationSingle'
import ProjectSingle from "@/src/DataTypes/Project/layouts/single/ProjectSingle"
import {getUserHeadersFromUserSession} from "@/auth/context/auth-context";
import {withSessionSsr} from "@/auth/session/handlers/withSession";


const SingleProjectPage = props => {

    return (
        <div className={`single-container single-organisation`}>

            <div className="maxWidthPageContainer">
            
                <ProjectSingle data={props} />

            </div>
            
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


