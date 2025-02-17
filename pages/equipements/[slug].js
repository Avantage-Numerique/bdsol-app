import React from 'react'
import {externalApiRequest} from '@/src/hooks/http-hook';


//components
import EquipmentSingleView from '@/src/DataTypes/Equipment/components/layouts/single/EquipmentSingleView';
import {getUserHeadersFromUserSession} from "@/auth/context/auth-context";
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import AppRoutes from "@/src/Routing/AppRoutes";


const SingleEquipmentViewPage = props => {

    return (
        <EquipmentSingleView data={props} route={AppRoutes.equipmentSingle} />
    )
}
    
export default SingleEquipmentViewPage;

export const getServerSideProps = withSessionSsr(equipmentSlugSSProps);

export async function equipmentSlugSSProps(context) {
    const { slug } = context.query;

    const response = await externalApiRequest(
        `/equipment/${slug}`,
        {
            method: 'GET',
            headers: getUserHeadersFromUserSession(context.req.session.user)
        });

    if(typeof response.data._id === "undefined")
        return { notFound: true };
        
    return { props: response.data };
}


