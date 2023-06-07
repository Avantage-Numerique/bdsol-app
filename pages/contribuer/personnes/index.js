import React, { useEffect } from 'react'

//Component 
import PersonSingleEdit from '@/DataTypes/Person/components/Forms/CreatePerson/PersonSingleEdit'
import CreatePersonForm from "@/DataTypes/Person/components/Forms/CreatePerson/CreatePersonForm"
import Spinner from '@/src/common/widgets/spinner/Spinner';
//Hooks 
import { useModal } from '@/src/hooks/useModal/useModal';

//Utils 
import {lang} from "@/src/common/Data/GlobalConstants";
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import {ssrCanAccess} from "@/auth/permissions/ssrCanAccess";


const PersonSingleEditPage = () => {

    //Modal hook
    const { modal, Modal, displayModal, closeModal } = useModal()
    //Loading state
    const [isLoading, setIsLoading] = useState(false);

    //Display the modal once the component has rendered
    useEffect(() => displayModal(), [])

    return (
        <div className="container py-4">
                {/* Empty single edit in the background */}
                <PersonSingleEdit data={{}} />
                {/* Loading state while waiting for rederection */}
                {isLoading && <Spinner fixed />}

                { modal.display &&
                    <Modal 
                        coloredBackground
                        darkColorButton
                    >
                        <header className={`d-flex flex-column`}>
                            <h3 className="text-primary">Ajouter une Personne</h3>
                            <p>Entrez les informations de base d'une entité "Personne". Vous pourrez l'éditer de manière détaillée par la suite.</p>
                        </header>   
                        <CreatePersonForm onPositiveResponse={() => {
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