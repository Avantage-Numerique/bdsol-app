import { useEffect, useState } from "react";

//Component
import ProjectSingleEdit from "@/src/DataTypes/Project/layouts/single/ProjectSingleEdit";
import CreateProjectForm from "@/DataTypes/Project/component/forms/CreateProjectForm";
import Spinner from "@/src/common/widgets/spinner/Spinner";
import Button from "@/src/common/FormElements/Button/Button";

//Hooks
import { useModal } from "@/src/hooks/useModal/useModal";

//Utils
import { lang } from "@/src/common/Data/GlobalConstants";
import { sessionContextInjector } from "@/auth/session/handlers/withSession";
import { ssrCanAccess } from "@/auth/permissions/ssrCanAccess";
import Router from "next/router";
import Project from "@/src/DataTypes/Project/models/Project";

const PersonSingleEditPage = () => {
    //Modal hook
    const { modal, Modal, displayModal, closeModal } = useModal();
    //Loading state once the form has been submitted and the page is waiting for redirection
    const [isLoading, setIsLoading] = useState(false);
    //Display the modal once the component has rendered
    useEffect(() => displayModal(), []);

    return (
        <div className="container">
            {/* Empty single edit, only to display in the background */}
            <ProjectSingleEdit data={{}} />
            {/* Loading spinner */}
            {isLoading && <Spinner fixed />}
        </div>
    );
};

export const getServerSideProps = sessionContextInjector(ssrCanAccess);

export default PersonSingleEditPage;
