import { useEffect, useState } from "react";

//Component
import OrganisationSingleEdit from "@/src/DataTypes/Organisation/components/forms/OrganisationSingleEdit/OrganisationSingleEdit";
import CreateOrganisationForm from "@/src/DataTypes/Organisation/components/forms/CreateOrganisationForm/CreateOrganisationForm";
import Spinner from "@/src/common/widgets/spinner/Spinner";
import Button from "@/src/common/FormElements/Button/Button";

//Hooks
import { useModal } from "@/src/hooks/useModal/useModal";

//Utils
import { withSessionSsr } from "@/auth/session/handlers/withSession";
import { ssrCanAccess } from "@/auth/permissions/ssrCanAccess";
import { lang } from "@/src/common/Data/GlobalConstants";
import Router from "next/router";
import Organisation from "@/src/DataTypes/Organisation/models/Organisation";

const CreateOrganisationPage = () => {
    //Modal hook
    const { modal, Modal, displayModal, closeModal } = useModal();
    const [isLoading, setIsLoading] = useState(false);

    //Display the modal once the component has rendered
    useEffect(() => displayModal(), []);

    return (
        <div className="container">
            <OrganisationSingleEdit data={{}} />
            {isLoading && <Spinner fixed />}
        </div>
    );
};

export const getServerSideProps = withSessionSsr(ssrCanAccess);

export default CreateOrganisationPage;
