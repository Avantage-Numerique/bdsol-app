import React from "react";
import { withSessionSsr } from "@/auth/session/handlers/withSession";
import AppRoutes from "@/src/Routing/AppRoutes";
import PlaceSingleEdit from "@/src/DataTypes/Place/components/layouts/single/PlaceSingleEdit";
import { ssrCanContributeToEntity } from "@/auth/permissions/ssrCanContributeToEntity";

const SinglePersonEditPage = (props) => {
  return <PlaceSingleEdit data={props} route={AppRoutes.placeSingle} />;
};

export default SinglePersonEditPage;

export const getServerSideProps = withSessionSsr(
  ssrCanContributeToEntity("places"),
);
