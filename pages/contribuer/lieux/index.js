import { useEffect, useState } from 'react'

//Component 
import PlaceSingleEdit from '@/src/DataTypes/Place/components/layouts/single/PlaceSingleEdit';
import CreatePlaceForm from '@/DataTypes/Place/components/forms/CreatePlaceForm/CreatePlaceForm';
import Spinner from '@/src/common/widgets/spinner/Spinner';
import Button from '@/src/common/FormElements/Button/Button'

//Hooks 
import { useModal } from '@/src/hooks/useModal/useModal';

//Utils 
import {lang} from "@/src/common/Data/GlobalConstants";
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import {ssrCanAccess} from "@/auth/permissions/ssrCanAccess";
import Router from "next/router";
import Place from '@/src/DataTypes/Place/models/Place';


const PlaceSingleEditPage = () => {

    //Modal hook
    const { modal, Modal, displayModal, closeModal } = useModal() 
    //Loading state once the form has been submitted and the page is waiting for redirection   
    const [isLoading, setIsLoading] = useState(false);
    //Display the modal once the component has rendered
    useEffect(() => displayModal(), [])

    return (
        <div className="container">
                {/* Empty single edit, only to display in the background */}
                <PlaceSingleEdit data={{}} />
                {/* Loading spinner */}
                {isLoading && <Spinner fixed />}
                {/* Modal with the form in it*/}
                { modal.display &&
                    <Modal 
                        coloredBackground
                        darkColorButton
                    >
                        <header className={`d-flex justify-content-between align-items-start mb-4`}>
                            <div className="d-flex flex-column">
                                <h3 className="text-secondary-darker">Ajouter un lieu</h3>
                                <p>Entrez les informations principales d'un lieu. Vous pourrez les éditer de manière détaillée par la suite.</p>
                            </div>
                            <Button 
                                onClick={() => {
                                    closeModal(
                                    Router.push(`/contribuer/`)
                                    )
                                }}
                            >{lang.cancel}</Button>
                        </header>   
                        <CreatePlaceForm onPositiveResponse={(response) => {
                            //Create a model for the response
                            const model = new Place(response.data);

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

export default PlaceSingleEditPage