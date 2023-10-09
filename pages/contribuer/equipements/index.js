import React, { useEffect, useState } from 'react'

//Component 
import Spinner from '@/src/common/widgets/spinner/Spinner';
import Button from '@/src/common/FormElements/Button/Button'

//Hooks 
import { useModal } from '@/src/hooks/useModal/useModal';

//Utils 
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import {ssrCanAccess} from "@/auth/permissions/ssrCanAccess";
import Router from "next/router";
import EquipmentSingleEdit from '@/src/DataTypes/Equipment/components/layouts/single/EquipmentSingleEdit';
import CreateEquipmentForm from '@/src/DataTypes/Equipment/components/Forms/CreateEquipmentForm/CreateEquipmentForm';

//Model
import Equipment from '@/src/DataTypes/Equipment/models/Equipment';

const EquipmentSingleEditPage = () => {

    //Modal hook
    const { modal, Modal, displayModal, closeModal } = useModal()
    //Loading state
    const [isLoading, setIsLoading] = useState(false);

    //Display the modal once the component has rendered
    useEffect(() => displayModal(), [])

    return (
        <div className="container py-4">
                {/* Empty single edit in the background */}
                <EquipmentSingleEdit data={{}} />
                {/* Loading state while waiting for rederection */}
                {isLoading && <Spinner fixed />}

                { modal.display &&
                    <Modal 
                        coloredBackground
                        darkColorButton
                    >
                        <header className={`d-flex justify-content-between align-items-start`}>
                            <div className="d-flex flex-column">
                                <h3 className="text-primary">Ajouter une Équipement</h3>
                                <p>Entrez les informations de base d'une entité "Équipement". Vous pourrez l'éditer de manière détaillée par la suite.</p>
                            </div>
                            <Button 
                                onClick={() => {
                                    closeModal(
                                    Router.push(`/contribuer/`)
                                    )
                                }}
                            >Fermer</Button>
                        </header>
                        <CreateEquipmentForm
                            onPositiveResponse={(response) => {
                                //Create a model for the response
                                const model = new Equipment(response.data);
                                //Execute the redirection
                                Router.push( model.singleEditLink )
                                closeModal()
                                setIsLoading(true)
                            }}
                        />
                    </Modal>
                }
        </div>
    )

}

export const getServerSideProps = withSessionSsr(ssrCanAccess);

export default EquipmentSingleEditPage