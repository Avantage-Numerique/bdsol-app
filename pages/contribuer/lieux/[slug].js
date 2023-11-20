import React from 'react'

import {
    externalApiRequest
} from '@/src/hooks/http-hook';


//components
import {getUserHeadersFromUserSession} from "@/auth/context/auth-context";
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import AppRoutes from "@/src/Routing/AppRoutes";
import PlaceSingleEdit from '@/src/DataTypes/Place/components/layouts/single/PlaceSingleEdit';

const SinglePersonEditPage = props => {

    return (
        <PlaceSingleEdit data={props} route={AppRoutes.placeSingle} />
    )
}
    
export default SinglePersonEditPage;

export const getServerSideProps = withSessionSsr(placeSlugSSProps);

export async function placeSlugSSProps(context) {
    const { slug } = context.query;

    const response = await externalApiRequest(
        `/places/${slug}`,
        {
            method: 'GET',
            headers: getUserHeadersFromUserSession(context.req.session.user)
        });

    return { props: response.data };
}


