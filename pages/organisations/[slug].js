import React from 'react'

import {externalApiRequest} from '@/src/hooks/http-hook';


//components
import OrganisationSingleView from '@/src/DataTypes/Organisation/components/layouts/single/OrganisationSingleView'
import {getUserHeadersFromUserSession} from "@/auth/context/auth-context";
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import AppRoutes from "@/src/Routing/AppRoutes";


const SingleOrganisationPage = props => {

    return (
        <div className={`single-organisation`}>
            <OrganisationSingleView data={props} route={AppRoutes.organisationSingle} />
        </div>
    )
}
    
export default SingleOrganisationPage;

export const getServerSideProps = withSessionSsr(organisationSlugProps);

export async function organisationSlugProps(context) {
    const { slug } = context.query;

    const response = await externalApiRequest(
        `/organisations/${slug}`,
        {
            method: 'GET',
            headers: getUserHeadersFromUserSession(context.req.session.user)
        });
        
    if(typeof response.data._id === "undefined")
        return { notFound: true };

    return { props: response.data };
}


