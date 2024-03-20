import React, { useEffect, useState } from 'react'

//Component 
import PersonSingleEdit from '@/DataTypes/Person/components/Forms/CreatePerson/PersonSingleEdit'
import CreatePersonForm from "@/DataTypes/Person/components/Forms/CreatePerson/CreatePersonForm"
import Spinner from '@/src/common/widgets/spinner/Spinner';
import Button from '@/src/common/FormElements/Button/Button'

//Hooks 
import { useModal } from '@/src/hooks/useModal/useModal';

//Utils 
import {lang} from "@/src/common/Data/GlobalConstants";
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import {ssrCanAccess} from "@/auth/permissions/ssrCanAccess";
import Router from "next/router";
import Person from '@/src/DataTypes/Person/models/Person';


const PersonSingleEditPage = () => {

    //Modal hook
    const { modal, Modal, displayModal, closeModal } = useModal()
    //Loading state
    const [isLoading, setIsLoading] = useState(false);

    //Display the modal once the component has rendered
    useEffect(() => displayModal(), [])

    return (
        <div className="container">
                {/* Empty single edit in the background */}
                <PersonSingleEdit data={{}} />
                {/* Loading state while waiting for rederection */}
                {isLoading && <Spinner fixed />}

                { modal.display &&
                    <Modal 
                        coloredBackground
                        darkColorButton
                    >
                        <header className={`d-flex justify-content-between align-items-start`}>
                            <div className="d-flex flex-column">
                                <h3 className="text-primary">Ajouter une personne</h3>
                                <p>Entrez les informations principales d'une personne. Vous pourrez les éditer de manière détaillée par la suite.</p>
                            </div>
                            <Button
                                onClick={() => {
                                    closeModal(
                                    Router.push(`/contribuer/`)
                                    )
                                }}
                            >{lang.cancel}</Button>
                        </header>
                        <CreatePersonForm onPositiveResponse={(response) => {
                            //Create a model for the response
                            const model = new Person(response.data);

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