import React, { useEffect, useState } from 'react'

//Component 
import EventSingleEdit from '@/src/DataTypes/Event/component/layout/single/EventSingleEdit';
import Spinner from '@/src/common/widgets/spinner/Spinner';
import Button from '@/src/common/FormElements/Button/Button'

//Hooks 
import { useModal } from '@/src/hooks/useModal/useModal';

//Utils 
import {lang} from "@/src/common/Data/GlobalConstants";
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import {ssrCanAccess} from "@/auth/permissions/ssrCanAccess";
import Router from "next/router";
import CreateEventForm from '@/src/DataTypes/Event/component/Forms/CreateEvent/CreateEventForm';


const EventSingleEditPage = () => {

    //Modal hook
    const { modal, Modal, displayModal, closeModal } = useModal()
    //Loading state
    const [isLoading, setIsLoading] = useState(false);

    //Display the modal once the component has rendered
    useEffect(() => displayModal(), [])

    return (
        <div className="container py-4">
                {/* Empty single edit in the background */}
                <EventSingleEdit data={{}} />
                {/* Loading state while waiting for rederection */}
                {isLoading && <Spinner fixed />}

                { modal.display &&
                    <Modal 
                        coloredBackground
                        darkColorButton
                    >
                        <header className={`d-flex justify-content-between align-items-start`}>
                            <div className="d-flex flex-column">
                                <h3 className="text-primary">Ajouter une Personne</h3>
                                <p>Entrez les informations de base d'une entité "Personne". Vous pourrez l'éditer de manière détaillée par la suite.</p>
                            </div>
                            <Button 
                                onClick={() => {
                                    closeModal(
                                    Router.push(`/contribuer/`)
                                    )
                                }}
                            >Fermer</Button>
                        </header>
                        <CreateEventForm onPositiveResponse={() => {
                            closeModal()
                            setIsLoading(true)
                        }}/>
                    </Modal>
                }
        </div>
    )

}

export const getServerSideProps = withSessionSsr(ssrCanAccess);

export default EventSingleEditPage