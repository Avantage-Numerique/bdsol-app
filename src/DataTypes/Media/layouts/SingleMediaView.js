
import Router from 'next/router';
import { useModal } from '@/src/hooks/useModal/useModal';
import UpdatePersonForm from '@/DataTypes/Person/Components/Forms/update/UpdatePersonForm';
import styles from './singleMediaView.module.scss';
import Single from "@/DataTypes/common/layouts/single/Single";
import SanitizedInnerHtml from "@/src/utils/SanitizedInnerHtml";
import React from "react";
import LicenceDisplay from '@/src/common/FormElements/SelectLicence/LicenceDisplay';


const SingleInfoLayout = ({ title, NAMessage="-", children }) => {
    const haveChildren = children && children !== "";
    return (
        <section className={`my-2 ${styles["singleInfoLayout"]}`}>
            <h4>{title}</h4>
            <div className={`px-3 ${styles["singleInfoLayout__main"]}`}>
                {haveChildren && children}
                {!haveChildren && NAMessage && (<>{NAMessage}</>)}
            </div>
        </section>
    )
}

const SingleMediaView = ({ data }) => {

    const { Modal, closeModal } = useModal();

    const aside = (
        <>
            <SingleInfoLayout
                title={"Métadonnées"}
                NAMessage={<p>Information non disponible</p>}
            >
                <p>Type de fichier: {data.fileType} ({data.extension})</p>
            </SingleInfoLayout>

            <SingleInfoLayout
                title={"Associé à l'entité"}>
                <SanitizedInnerHtml tag={"span"}>{data.entityId}</SanitizedInnerHtml>
            </SingleInfoLayout>
        </>
    )
    const headerMainContent = (
        <div className={`${styles["quick-section"]}`}>
            <h1>{data.title}</h1>
            <div className={`${styles["quick-section__single-info"]}`}>
                <span>Nom de fichier : </span>{data.fileName}
            </div>
            <div className={`${styles["quick-section__single-info"]}`}>
                <span>Licence : </span>
                <LicenceDisplay licenceKey={data.licence}/>
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
            showCTA={false}
            showMainImageInHeader={false}
            showUpdateMenu={false}
            mainImageClass={"header-content__media-preview"}
        >

            <div className={`single-media-main-image`}>
                <figure>
                    <img className={"img-fluid"} src={data.url} alt={data.alt} />
                </figure>
            </div>

            <SingleInfoLayout
                title={"Alt"}>
                <SanitizedInnerHtml tag={"span"}>{data.alt}</SanitizedInnerHtml>
            </SingleInfoLayout>

            <SingleInfoLayout
                title={"Description"}>
                <SanitizedInnerHtml tag={"span"}>{data.description}</SanitizedInnerHtml>
            </SingleInfoLayout>


            {
                data.status && data.status.state &&
                <SingleInfoLayout
                    title="Statut de l'entité"
                    NAMessage={ data.status.state === 'accepted' ? "Acceptée" : "En attente d'approbation"}>
                </SingleInfoLayout>
            }

            {
                data.status && data.status.requestedBy &&
                <SingleInfoLayout
                    title={"Créer par"}
                    NAMessage={ <p>{ "Numéro d'identification de l'utilisateur : " + data.status.requestedBy}</p>}>
                </SingleInfoLayout>
            }
            {
                data.status && data.status.lastModifiedBy &&
                <SingleInfoLayout
                    title={"Dernière modifications par"}
                    NAMessage={ <p>{"Numéro d'identification de l'utilisateur : " + data.status.lastModifiedBy}</p>}>
                </SingleInfoLayout>
            }
        </Single>
    )
}


export default SingleMediaView
