import React from 'react'
import {externalApiRequest} from '@/src/hooks/http-hook';


//components
import PersonSingleView from '@/DataTypes/Person/components/layouts/single/PersonSingleView'
import {getUserHeadersFromUserSession} from "@/auth/context/auth-context";
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import AppRoutes from "@/src/Routing/AppRoutes";


const SinglePersonViewPage = props => {

    return (
        <div className={`single-container single-person`}>
            <div className="maxWidthPageContainer">
                <PersonSingleView data={props} route={AppRoutes.personSingle} />
            </div>
        </div>
    )
}
    
export default SinglePersonViewPage;

export const getServerSideProps = withSessionSsr(personSlugSSProps);

export async function personSlugSSProps(context) {
    const { slug } = context.query;

    const response = await externalApiRequest(
        `/persons/${slug}`,
        {
            method: 'GET',
            headers: getUserHeadersFromUserSession(context.req.session.user)
        });

    if(typeof response.data._id === "undefined")
        return { notFound: true };
        
    return { props: response.data };
}


