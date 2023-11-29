import { useEffect, useState } from 'react'

//Component 
import ProjectSingleEdit from '@/src/DataTypes/Project/layouts/single/ProjectSingleEdit'
import CreateProjectForm from '@/DataTypes/Project/component/forms/CreateProjectForm'
import Spinner from '@/src/common/widgets/spinner/Spinner';
import Button from '@/src/common/FormElements/Button/Button'

//Hooks 
import { useModal } from '@/src/hooks/useModal/useModal';

//Utils 
import {lang} from "@/src/common/Data/GlobalConstants";
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import {ssrCanAccess} from "@/auth/permissions/ssrCanAccess";
import Router from "next/router";
import Project from '@/src/DataTypes/Project/models/Project';


const PersonSingleEditPage = () => {

    //Modal hook
    const { modal, Modal, displayModal, closeModal } = useModal() 
    //Loading state once the form has been submitted and the page is waiting for redirection   
    const [isLoading, setIsLoading] = useState(false);
    //Display the modal once the component has rendered
    useEffect(() => displayModal(), [])

    return (
        <div className="container py-4">
                {/* Empty single edit, only to display in the background */}
                <ProjectSingleEdit data={{}} />
                {/* Loading spinner */}
                {isLoading && <Spinner fixed />}
                {/* Modal with the form in it*/}
                { modal.display &&
                    <Modal 
                        coloredBackground
                        darkColorButton
                    >
                        <header className={`d-flex justify-content-between align-items-start`}>
                            <div className="d-flex flex-column">
                                <h3 className="text-primary">Ajouter un projet</h3>
                                <p>Entrez les informations de base d'une entité "Projet". Vous pourrez l'éditer de manière détaillée par la suite.</p>
                            </div>
                            <Button 
                                onClick={() => {
                                    closeModal(
                                    Router.push(`/contribuer/`)
                                    )
                                }}
                            >Fermer</Button>
                        </header>   
                        <CreateProjectForm onPositiveResponse={(response) => {
                            //Create a model for the response
                            const model = new Project(response.data);

                            //Execute the redirection
                            Router.push( model.singleEditLink )
                            closeModal()
                            setIsLoading(true)
                        }}/>
                    </Modal>
                }
        </div>
    )

}

export const getServerSideProps = withSessionSsr(ssrCanAccess);

export default PersonSingleEditPage