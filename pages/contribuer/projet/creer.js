import React, {useEffect} from 'react';

import Single from "@/DataTypes/common/layouts/single/Single";
import CreateProjectForm from '@/DataTypes/Project/forms/CreateProjectForm';

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
            <Single
                className={`single `}
               // headerMainContent={headerMainContent}
               // entity={data}
                ModalForm={Modal}
                modalParams={modalComponentParams}
                showCTA={true}
                cta={"Visiter la page de la ressource"}
              //  ctaUrl={url}
              //  defaultMainImage={defaultOrgAvatar}
                modalMainImageControl={imgModalControl}
              //  route={AppRoutes.organisationSingle}
                breadcrumbParams={{
                        title: `banane`
                    }}
            >
            </Single>

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