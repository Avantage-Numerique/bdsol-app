import React from 'react'

import {
    externalApiRequest
} from '@/src/hooks/http-hook';


//components
import {getUserHeadersFromUserSession} from "@/auth/context/auth-context";
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import AppRoutes from "@/src/Routing/AppRoutes";
import OrganisationSingleEdit from '@/src/DataTypes/Organisation/components/forms/OrganisationSingleEdit/OrganisationSingleEdit';


const OrganisationSingleEditPage = props => {

    return (
        <div className={`single-organisation`}>
            <OrganisationSingleEdit data={props} route={AppRoutes.organisationSingle} />
        </div>
    )
}
    
export default OrganisationSingleEditPage;

export const getServerSideProps = withSessionSsr(organisationSlugProps);

export async function organisationSlugProps(context) {
    const { slug } = context.query;

    const response = await externalApiRequest(
        `/organisations/${slug}`,
        {
            method: 'GET',
            headers: getUserHeadersFromUserSession(context.req.session.user)
        });

    return { props: response.data };
}


