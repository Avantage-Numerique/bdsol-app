import React from 'react'
import {
    externalApiRequest
} from '@/src/hooks/http-hook';
import {getUserHeadersFromUserSession} from "@/auth/context/auth-context";
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import AppRoutes from "@/src/Routing/AppRoutes";
import EquipmentSingleEdit from '@/src/DataTypes/Equipment/components/layouts/single/EquipmentSingleEdit';
import {ssrCanAccess} from "@/auth/permissions/ssrCanAccess";
import {ssrCanContributeToEntity} from "@/auth/permissions/ssrCanContributeToEntity";

const SingleEquipmentEditPage = props => {

    return (
        <EquipmentSingleEdit data={props} route={AppRoutes.equipmentSingle} />
    )
}
    
export default SingleEquipmentEditPage;

export const getServerSideProps = withSessionSsr(ssrCanContributeToEntity('equipment'));