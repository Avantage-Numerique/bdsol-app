import React from 'react'

import {
    externalApiRequest
} from '@/src/hooks/http-hook';


//components
import {getUserHeadersFromUserSession} from "@/auth/context/auth-context";
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import AppRoutes from "@/src/Routing/AppRoutes";
import EquipmentSingleEdit from '@/src/DataTypes/Equipment/components/layouts/single/EquipmentSingleEdit';

const SingleEquipmentEditPage = props => {

    return (
        <EquipmentSingleEdit data={props} route={AppRoutes.equipmentSingle} />
    )
}
    
export default SingleEquipmentEditPage;

export const getServerSideProps = withSessionSsr(equipmentSlugSSProps);

export async function equipmentSlugSSProps(context) {
    const { slug } = context.query;

    const response = await externalApiRequest(
        `/equipment/${slug}`,
        {
            method: 'GET',
            headers: getUserHeadersFromUserSession(context.req.session.user)
        });

    return { props: response.data };
}


