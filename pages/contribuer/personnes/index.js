import React, { useEffect } from 'react'

//Component 
import PersonSingleEdit from '@/src/DataTypes/Person/Components/Forms/CreatePerson/PersonSingleEdit'
import Button from '@/src/common/FormElements/Button/Button';
import SingleViewEntityFormLayout from "@/DataTypes/common/layouts/SingleViewEntityFormLayout/SingleViewEntityFormLayout";
import CreatePersonForm from "@/DataTypes/Person/Components/Forms/CreatePerson/CreatePersonForm"

//Hooks 
import { useModal } from '@/src/hooks/useModal/useModal';

//Utils 
import {lang} from "@/src/common/Data/GlobalConstants";
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import {ssrCanAccess} from "@/auth/permissions/ssrCanAccess";


const PersonSingleEditPage = () => {

    //Modal hook
    const { modal, Modal, displayModal, closeModal } = useModal()

    //Display the modal once the component has rendered
    useEffect(() => displayModal(), [])

    return (
        <div className="container py-4">
                <PersonSingleEdit data={{}} />

                { modal.display &&
                    <Modal 
                        coloredBackground
                        darkColorButton
                    >
                        <header className={`d-flex flex-column`}>
                            <h3 className="text-primary">Ajouter une Personne</h3>
                            <p>Entrez les informations de base d'une entité "Personne". Vous pourrez l'éditer de manière détaillée par la suite.</p>
                        </header>   
                        <CreatePersonForm />
                    </Modal>
                }
        </div>
    )

}

export const getServerSideProps = withSessionSsr(ssrCanAccess);

export default PersonSingleEditPage