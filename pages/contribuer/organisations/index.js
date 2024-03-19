import { useEffect, useState } from "react";

//Component 
import OrganisationSingleEdit from '@/src/DataTypes/Organisation/components/forms/OrganisationSingleEdit/OrganisationSingleEdit'
import CreateOrganisationForm from '@/src/DataTypes/Organisation/components/forms/CreateOrganisationForm/CreateOrganisationForm'
import Spinner from '@/src/common/widgets/spinner/Spinner';
import Button from '@/src/common/FormElements/Button/Button'


//Hooks 
import { useModal } from '@/src/hooks/useModal/useModal';

//Utils
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import {ssrCanAccess} from "@/auth/permissions/ssrCanAccess";
import {lang} from "@/src/common/Data/GlobalConstants";
import Router from "next/router";
import Organisation from "@/src/DataTypes/Organisation/models/Organisation";




const CreateOrganisationPage = () => {

    //Modal hook
    const { modal, Modal, displayModal, closeModal } = useModal()
    const [isLoading, setIsLoading] = useState(false);

    //Display the modal once the component has rendered
    useEffect(() => displayModal(), [])

    return (
        <div className="container py-4">
            <OrganisationSingleEdit  data={{}}  />
            {isLoading && <Spinner fixed />}
            {/* Modal containing the form */}
            { modal.display &&
                    <Modal 
                        coloredBackground
                        darkColorButton
                    >
                        <header className={`d-flex justify-content-between align-items-start`}>
                            <div className="d-flex flex-column">
                                <h3 className="text-primary">Ajouter une organisation</h3>
                                <p>Entrez les informations principales d'une organisation. Vous pourrez les éditer de manière détaillée par la suite.</p>
                            </div>
                            <Button 
                                onClick={() => {
                                    closeModal(
                                    Router.push(`/contribuer/`)
                                    )
                                }}
                            >{lang.cancel}</Button>
                        </header>   
                        <CreateOrganisationForm onPositiveResponse={(response) => {
                            //Create a model for the response
                            const model = new Organisation(response.data);

                            //Execute the redirection
                            Router.push( model.singleEditLink )
                            closeModal()
                            setIsLoading(true)
                        }} />
                    </Modal>
                }
        </div>
    )

    /* DEPRECATED
    return (
        <SingleViewEntityFormLayout formName={"organisation"} headerProps={{
            title: lang.Organisation,
            subTitle: lang.formOrganisationSubtitle,
            subtitleColor: "primary",
            description: lang.formOrganisationInstructions,
            historyBack: {
                uri: "/contribuer",
                label: lang.historyBack
            }
        }}>
            <OrganisationSingleEdit />
        </SingleViewEntityFormLayout>
    )
    */
}

export const getServerSideProps = withSessionSsr(ssrCanAccess);

export default CreateOrganisationPage