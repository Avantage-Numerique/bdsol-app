import React from 'react'

import {
    externalApiRequest
} from '@/src/hooks/http-hook';


//components
import {getUserHeadersFromUserSession} from "@/auth/context/auth-context";
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import AppRoutes from "@/src/Routing/AppRoutes";
import EventSingleEdit from '@/src/DataTypes/Event/component/layout/single/EventSingleEdit';


const SingleEventEditPage = props => {

    return (
        <EventSingleEdit data={props} route={AppRoutes.eventSingle} />
    )
}
    
export default SingleEventEditPage;

export const getServerSideProps = withSessionSsr(eventSlugSSProps);

export async function eventSlugSSProps(context) {
    const { slug } = context.query;

    const response = await externalApiRequest(
        `/events/${slug}`,
        {
            method: 'GET',
            headers: getUserHeadersFromUserSession(context.req.session.user)
        });

    return { props: response.data };
}


