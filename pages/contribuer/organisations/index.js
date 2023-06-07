import { useEffect } from "react";

//Component 
import OrganisationSingleEdit from '@/src/DataTypes/Organisation/components/forms/OrganisationSingleEdit/OrganisationSingleEdit'
import CreateOrganisationForm from '@/src/DataTypes/Organisation/components/forms/CreateOrganisationForm/CreateOrganisationForm'

//Hooks 
import { useModal } from '@/src/hooks/useModal/useModal';

//Utils
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import {ssrCanAccess} from "@/auth/permissions/ssrCanAccess";
import {lang} from "@/src/common/Data/GlobalConstants";



const CreateOrganisationPage = () => {

    //Modal hook
    const { modal, Modal, displayModal, closeModal } = useModal()

    //Display the modal once the component has rendered
    useEffect(() => displayModal(), [])

    return (
        <div className="container py-4">
            <OrganisationSingleEdit  data={{}}  />
            {/* Modal containing the form */}
            { modal.display &&
                    <Modal 
                        coloredBackground
                        darkColorButton
                    >
                        <header className={`d-flex flex-column`}>
                            <h3 className="text-primary">Ajouter une Organisation</h3>
                            <p>Entrez les informations de base d'une entité "Organisation". Vous pourrez l'éditer de manière détaillée par la suite.</p>
                        </header>   
                        <CreateOrganisationForm />
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