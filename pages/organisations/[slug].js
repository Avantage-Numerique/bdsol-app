import React from 'react'

import {
    externalApiRequest
} from '@/src/hooks/http-hook';


//components
import OrganisationSingle from '@/src/DataTypes/Organisation/components/layouts/single/OrganisationSingle'
import {getUserHeadersFromUserSession} from "@/auth/context/auth-context";
import {withSessionSsr} from "@/auth/session/handlers/withSession";


const SingleOrganisationPage = props => {

    return (
        <div>

            <div className="maxWidthPageContainer">
            
                <OrganisationSingle data={props} />

            </div>
            
        </div>
    )
}
    
export default SingleOrganisationPage;

export const getServerSideProps = withSessionSsr(personSlugSSProps);

export async function personSlugSSProps(context) {
    const { slug } = context.query;

    const response = await externalApiRequest(
        `/organisations/${slug}`,
        {
            method: 'GET',
            headers: getUserHeadersFromUserSession(context.req.session.user)
        });

    return { props: response.data };
}

