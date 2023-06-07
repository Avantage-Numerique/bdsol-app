import React, { useEffect } from 'react'

//Component 
import ProjectSingleEdit from '@/src/DataTypes/Project/layouts/single/ProjectSingleEdit'
import CreateProjectForm from '@/DataTypes/Project/component/forms/CreateProjectForm'

//Hooks 
import { useModal } from '@/src/hooks/useModal/useModal';

//Utils 
import {lang} from "@/src/common/Data/GlobalConstants";
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import {ssrCanAccess} from "@/auth/permissions/ssrCanAccess";


const PersonSingleEditPage = () => {

    //Modal hook
    const { modal, Modal, displayModal } = useModal()

    //Display the modal once the component has rendered
    useEffect(() => displayModal(), [])

    return (
        <div className="container py-4">
                <ProjectSingleEdit data={{}} />

                { modal.display &&
                    <Modal 
                        coloredBackground
                        darkColorButton
                    >
                        <header className={`d-flex flex-column`}>
                            <h3 className="text-primary">Ajouter un Projet</h3>
                            <p>Entrez les informations de base d'une entité "Projet". Vous pourrez l'éditer de manière détaillée par la suite.</p>
                        </header>   
                        <CreateProjectForm />
                    </Modal>
                }
        </div>
    )

}

export const getServerSideProps = withSessionSsr(ssrCanAccess);

export default PersonSingleEditPage