import React from 'react'

import {
    externalApiRequest
} from '@/src/hooks/http-hook';


//components
import {getUserHeadersFromUserSession} from "@/auth/context/auth-context";
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import AppRoutes from "@/src/Routing/AppRoutes";
import PersonSingleEdit from '@/DataTypes/Person/components/Forms/CreatePerson/PersonSingleEdit';


const SinglePersonEditPage = props => {

    return (
        <div className={`single-container single-person`}>
            <div className="maxWidthPageContainer">
                <PersonSingleEdit data={props} route={AppRoutes.projectSingle} />
            </div>
        </div>
    )
}
    
export default SinglePersonEditPage;

export const getServerSideProps = withSessionSsr(personSlugSSProps);

export async function personSlugSSProps(context) {
    const { slug } = context.query;

    const response = await externalApiRequest(
        `/persons/${slug}`,
        {
            method: 'GET',
            headers: getUserHeadersFromUserSession(context.req.session.user)
        });

    return { props: response.data };
}


