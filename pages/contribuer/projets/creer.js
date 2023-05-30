import React, {useEffect} from 'react';

import Single from "@/DataTypes/common/layouts/single/Single";
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase"
import CreateProjectForm from '@/src/DataTypes/Project/component/forms/CreateProjectForm';

//Custom hooks
import {useModal} from "@/src/hooks/useModal/useModal";


const CreateProject = () => {

    const { modal, Modal, displayModal, closeModal } = useModal();

    const formModal = useModal();

    useEffect(() => {
        formModal.displayModal();
    }, [])

    const modalForm = useModal();

    const modalComponentParams = {
        uri:"update"
    };

    const imgModalControl = useModal();

    return (
        <>
            <SingleBase />

            {formModal.modal.display &&
                <formModal.Modal>
                        <h3>Nouveau projet</h3>
                        <CreateProjectForm />
                </formModal.Modal>
            }
        </>
    )
}

export default CreateProject;