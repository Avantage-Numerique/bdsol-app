
import Router from 'next/router';
import { useModal } from '@/src/hooks/useModal/useModal';
import UpdatePersonForm from '@/DataTypes/Person/Components/Forms/update/UpdatePersonForm';
import styles from './singleMediaView.module.scss';
import Single from "@/DataTypes/common/layouts/single/Single";
import SanitizedInnerHtml from "@/src/utils/SanitizedInnerHtml";


const SingleInfoLayout = ({ title, NAMessage, children }) => {

    return (
        <section className={`my-2 ${styles["singleInfoLayout"]}`}>
            <h4>{title}</h4>
            <div className={`px-3 ${styles["singleInfoLayout__main"]}`}>
                {children && children}
                {!children && NAMessage && (<>{NAMessage}</>)}
            </div>
        </section>
    )
}

const SingleMediaView = ({ data }) => {

    const {status} = data;

    const { Modal, closeModal } = useModal();

    const aside = (
        <>
            <SingleInfoLayout
                title={"Moyen de contact"}
                NAMessage={<p>Information non disponible</p>}
            >
                <p>Tel : (123)-456-7890 <br/>
                    Courriel : mail@mail.com
                </p>
            </SingleInfoLayout>

            <SingleInfoLayout
                title={"Adresse"}
                NAMessage={<p>Information non disponible</p>}
            >
                <p>123, rue Adresse<br/>
                    Ville, Code postal, Qc
                </p>
            </SingleInfoLayout>
        </>
    )
    const headerMainContent = (
        <div className={`${styles["quick-section"]}`}>

            <div className={`${styles["quick-section__single-info"]}`}>
                <span>Langue : </span>Information bientôt disponible.
            </div>

            <div className={`${styles["quick-section__single-info"]}`}>
                <span>Citoyenneté : </span>Information bientôt disponible.
            </div>

        </div>
    )

    const modalComponent = (
        <Modal
            className={`${styles["media-form-modal"]}`}
            coloredBackground
            darkColorButton
            closingFunction={closeModal}
        >
            <UpdatePersonForm
                initValues={data}
                positiveRequestActions={{
                    //CallbackFunction is one of the four behaviors the useFormUtils hook can apply when a request return a positive answer
                    callbackFunction: requestResponse => {

                        //Redirect to the right path if the slug changes and otherwise, at least reflect the changes
                        Router.push(`/persons/${requestResponse.data.slug}`);

                        //Close the modal
                        closeModal()
                    }
                }}
            />
        </Modal>
    )

    return (
        <Single
            className={`single ${styles["single-media"]}`}
            aside={aside}
            headerMainContent={headerMainContent}
            entity={data}
            modalComponent={modalComponent}
            showCTA={true}
        >
            <SingleInfoLayout
                title={"Présentation"}
                NAMessage={<p>Aucune donnée n'a encore été fournie pour ce champ. <br />Vous pourrez bientôt passer en mode édition afin d'ajouter et modifier des information.</p>}
            >
                <SanitizedInnerHtml>
                    {data.description}
                </SanitizedInnerHtml>
            </SingleInfoLayout>

            <SingleInfoLayout
                title={"Projets"}
                NAMessage={<p>Information bientôt disponible.</p>}
            />

            <SingleInfoLayout
                title={"Intérêts"}
                NAMessage={<p>Information bientôt disponible.</p>}
            />


            {
                status && status.state &&
                <SingleInfoLayout
                    title="Statut de l'entité"
                    NAMessage={ status.state === 'accepted' ? "Acceptée" : "En attente d'approbation"}>
                </SingleInfoLayout>
            }

            {
                status && status.requestedBy &&
                <SingleInfoLayout
                    title={"Créer par"}
                    NAMessage={ <p>{ "Numéro d'identification de l'utilisateur : " + status.requestedBy}</p>}>
                </SingleInfoLayout>
            }
            {
                status && status.lastModifiedBy &&
                <SingleInfoLayout
                    title={"Dernière modifications par"}
                    NAMessage={ <p>{"Numéro d'identification de l'utilisateur : " + status.lastModifiedBy}</p>}>
                </SingleInfoLayout>
            }
        </Single>
    )
}


export default SingleMediaView
