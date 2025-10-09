import React from "react";
import { withSessionSsr } from "@/auth/session/handlers/withSession";
import AppRoutes from "@/src/Routing/AppRoutes";
import EquipmentSingleEdit from "@/src/DataTypes/Equipment/components/layouts/single/EquipmentSingleEdit";
import { ssrCanContributeToEntity } from "@/auth/permissions/ssrCanContributeToEntity";

const SingleEquipmentEditPage = (props) => {
    return (
        <EquipmentSingleEdit data={props} route={AppRoutes.equipmentSingle} />
    );
};

export default SingleEquipmentEditPage;

export const getServerSideProps = withSessionSsr(
    ssrCanContributeToEntity("equipment")
);
