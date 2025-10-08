import React from "react";
import { withSessionSsr } from "@/auth/session/handlers/withSession";
import AppRoutes from "@/src/Routing/AppRoutes";
import EventSingleEdit from "@/src/DataTypes/Event/component/layout/single/EventSingleEdit";
import { ssrCanContributeToEntity } from "@/auth/permissions/ssrCanContributeToEntity";

const SingleEventEditPage = (props) => {
  return <EventSingleEdit data={props} route={AppRoutes.eventSingle} />;
};

export default SingleEventEditPage;

export const getServerSideProps = withSessionSsr(
  ssrCanContributeToEntity("events"),
);
