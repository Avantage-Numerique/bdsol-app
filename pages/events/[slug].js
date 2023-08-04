import React from 'react'
import {externalApiRequest} from '@/src/hooks/http-hook';


//components
import EventSingleView from '@/src/DataTypes/Event/component/layout/single/EventSingleView';
import {getUserHeadersFromUserSession} from "@/auth/context/auth-context";
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import AppRoutes from "@/src/Routing/AppRoutes";


const SingleEventViewPage = props => {

    return (
        <div className={`single-container single-person`}>
            <div className="maxWidthPageContainer">
                <EventSingleView data={props} route={AppRoutes.eventSingle} />
            </div>
        </div>
    )
}
    
export default SingleEventViewPage;

export const getServerSideProps = withSessionSsr(eventSlugSSProps);

export async function eventSlugSSProps(context) {
    const { slug } = context.query;

    const response = await externalApiRequest(
        `/events/${slug}`,
        {
            method: 'GET',
            headers: getUserHeadersFromUserSession(context.req.session.user)
        });

    if(typeof response.data._id === "undefined")
        return { notFound: true };
        
    return { props: response.data };
}


