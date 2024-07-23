import React from 'react'
import {externalApiRequest} from '@/src/hooks/http-hook';


//components
import PlaceSingleView from '@/src/DataTypes/Place/components/layouts/single/PlaceSingleView';
import {getUserHeadersFromUserSession} from "@/auth/context/auth-context";
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import AppRoutes from "@/src/Routing/AppRoutes";


const SinglePlaceViewPage = props => {

    return (
        <PlaceSingleView data={props} route={AppRoutes.placeSingle} />
    )
}
    
export default SinglePlaceViewPage;

export const getServerSideProps = withSessionSsr(placeSlugSSProps);

export async function placeSlugSSProps(context) {
    const { slug } = context.query;

    const response = await externalApiRequest(
        `/places/${slug}`,
        {
            method: 'GET',
            headers: getUserHeadersFromUserSession(context.req.session.user)
        });

    if(typeof response.data._id === "undefined")
        return { notFound: true };
        
    return { props: response.data };
}


