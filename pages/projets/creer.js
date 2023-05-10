import React from 'react';

//Component
import Single from "@/DataTypes/common/layouts/single/Single";
import CreateProjectForm from '@/src/DataTypes/Project/forms/CreateProjectForm';

//Custom hooks
import {useModal} from "@/src/hooks/useModal/useModal";

const CreateProject = () => {

    const { modal, Modal, displayModal, closeModal } = useModal();

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

            <Modal>
                
                    <h3 className="text-blue3 mb-4">Nouveau projet</h3>
                    <CreateProjectForm />

            </Modal>
        </>
    )
}

export default CreateProject;