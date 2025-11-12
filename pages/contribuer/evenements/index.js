import React, { useEffect, useState } from "react";

//Component
import EventSingleEdit from "@/src/DataTypes/Event/component/layout/single/EventSingleEdit";
import Spinner from "@/src/common/widgets/spinner/Spinner";
import Button from "@/src/common/FormElements/Button/Button";

//Hooks
import { useModal } from "@/src/hooks/useModal/useModal";

//Utils
import { withSessionSsr } from "@/auth/session/handlers/withSession";
import { ssrCanAccess } from "@/auth/permissions/ssrCanAccess";
import Router from "next/router";
import CreateEventForm from "@/src/DataTypes/Event/component/Forms/CreateEvent/CreateEventForm";
import { lang } from "@/src/common/Data/GlobalConstants";

//Model
import Event from "@/src/DataTypes/Event/models/Event";

const EventSingleEditPage = () => {
    //Modal hook
    const { modal, Modal, displayModal, closeModal } = useModal();
    //Loading state
    const [isLoading, setIsLoading] = useState(false);

    //Display the modal once the component has rendered
    useEffect(() => displayModal(), []);

    return (
        <div className="container">
            {/* Empty single edit in the background */}
            <EventSingleEdit data={{}} />
            {/* Loading state while waiting for rederection */}
            {isLoading && <Spinner fixed />}
        </div>
    );
};

export const getServerSideProps = withSessionSsr(ssrCanAccess);

export default EventSingleEditPage;
