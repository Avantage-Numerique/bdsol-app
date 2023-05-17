import React from 'react';

//Utils
import { lang } from '@/src/common/Data/GlobalConstants';

//Styling
import styles from './MainImageDisplay.module.scss';

//Hooks
import {useModal} from "@/src/hooks/useModal/useModal";

//Components
import CreateMediaForm from "@/DataTypes/Media/components/forms/CreateMedia/CreateMediaForm";
import Button from "@/FormElements/Button/Button";


//{ mainImage, entity }
const MainImageDisplay = () => {

    const entity = {
        catchphrase: "",
        contactPoint: "info@meilleurelibrairie.meilleurfois2",
        createdAt: "2023-04-11T20:53:17.554Z",
        description: "Librairie de petits marchandeurs",
        domains: [],
        fondationDate: "2000-01-02T00:00:00.000Z",
        mainImage: {
            alt: "",
            createdAt: "2023-05-04T15:04:27.302Z",
            dbStatus: "in use",
            description: "",
            entityId: "6435c8be0845c9f656762540",
            entityType: "Organisation",
            extension: "jpeg",
            fileName: "mainImage--898307-316831998_537195091597787_4660118437189654487_n",
            fileType: "image",
            licence: "zero",
            path: "./localStorage/public/Organisation/6435c8be0845c9f656762540",
            slug: "6435c8be0845c9f656762540",
            status: {state: 'pending', _id: '6453c97b44dce4599114c501'},
            title: "Merette cookie monster",
            updatedAt: "2023-05-04T15:04:27.302Z",
            url: "/medias/Organisation/6435c8be0845c9f656762540/mainImage--898307-316831998_537195091597787_4660118437189654487_n.jpeg",
            __v: 0,
            _id: "6453c97b44dce4599114c500"
        },
        name: "Librairie Pommerleau",
        offers: [],
        slug: "librairie-pommerleau",
        status: {state: 'accepted', lastModifiedBy: null, _id: '6435c8be81475042e104c957'},
        team: [],
        type: "Organisation",
        updatedAt: "2023-05-10T16:09:53.725Z",
        url: "https://lalibrairiepommerleau.meilleur",
        _id: "6435c8be0845c9f656762540",
    }

    const mainImage = entity.mainImage;

    const {displayModal, modal, closeModal, Modal} = useModal();

    const redirectOnClosingHandler = (requestResponse, closingCallback, targetSlug) => {
        let redirectUrl = "";
        if (closingModalBaseURI !== undefined) {    //Add the baseURI
            redirectUrl += `${closingModalBaseURI}`;
        }
        if (targetSlug !== undefined) {             //Add the slug if it's set
            redirectUrl += `${targetSlug}`;
        }
        if (redirectUrl !== "") {
            Router.push(`${redirectUrl}`);
            closingCallback();
        } else {
            throw(new Error("Un problème est survenu."));
        }
    }

    const haveMainImage = mainImage !== undefined && mainImage !== "";
    const mainImageRootUrl = haveMainImage ? process.env.NEXT_PUBLIC_API_URL : "";//we dont add api path if it's local.
    const mainImageUrl = mainImage?.url ?? "/general_images/person-default.webp";
    const mainImageAlt = mainImage?.alt ?? "main image alt";

    return (
        <>
            <div>
                <figure className={`${styles["main-image-container"]}`}>
                    {haveMainImage &&
                        <a href={`/medias/${mainImage._id}`}
                            className={`fs-4 w-100 h-100 position-absolute d-flex align-items-center justify-content-center p-1 ${styles["profile-picture--modification-opt"]}`}>
                            Afficher
                        </a>
                    }
                    
                    <img className={`${styles["main-image"]}`} src={mainImageRootUrl + mainImageUrl} alt={mainImageAlt}/>
                    
                    <div className={`${styles["edit-image-button"]}`}>
                        <a href={"#"}>
                            <img src={"/icones/edit-icon.svg"} title={haveMainImage ? lang.updateImage : lang.addImage} alt={"Changer l'image"}/>
                        </a>
                    </div>
                </figure>
            </div>

            {/******** Img Modal Display *********/}
            {
                modal.display &&
                <Modal
                    coloredBackground
                    darkColorButton
                >
                    <header className="d-flex justify-content-between align-items-center">
                        <h3 className="m-0 fs-4 fw-normal">Téléverser un ficher média</h3>
                        <Button onClick={closeModal} size="slim">Fermer</Button>
                    </header>
                    {/* Separation line */}
                    <div className="border-bottom w-100 my-2"></div>
                    <CreateMediaForm
                        initValues={mainImage}
                        entity={entity}
                        positiveRequestActions={{//CallbackFunction is one of the four behaviors the useFormUtils hook can apply when a request return a positive answer
                            callbackFunction: (requestResponse) => {
                                redirectOnClosingHandler(requestResponse, modal.closeModal, entity.slug);
                            }
                        }}
                    />
                </Modal>
            }
        </>
    )
}


export default MainImageDisplay