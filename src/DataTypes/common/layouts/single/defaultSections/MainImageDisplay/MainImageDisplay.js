import React, {useState} from 'react';

//Utils
import {lang} from '@/src/common/Data/GlobalConstants';

//Styling
import styles from './MainImageDisplay.module.scss';

//Hooks
import {useModal} from "@/src/hooks/useModal/useModal";

//components
import CreateMediaForm from "@/DataTypes/Media/components/forms/CreateMedia/CreateMediaForm";
import Button from "@/FormElements/Button/Button";
import {getDefaultImageByEntityType} from "@/src/helpers/images";


//{ mainImage, entity, editable}
const MainImageDisplay = ({ mainImage, entity, editableImg }) => {

    const {displayModal, modal, closeModal, Modal} = useModal();

    const haveMainImage = mainImage !== undefined && mainImage !== "";
    const mainImageRootUrl = haveMainImage ? process.env.NEXT_PUBLIC_API_URL : "";//we dont add api path if it's local.
    const mainImageUrl = mainImage?.url ?? getDefaultImageByEntityType(entity?.type);//"/general_images/person-default.webp";
    const mainImageAlt = mainImage?.alt ?? "main image alt";
    const [mainImageState, setMainImageState] = useState(
        {
            mainImage: mainImage,
            haveMainImage: haveMainImage,
            mainImageRootUrl:mainImageRootUrl,
            mainImageUrl:mainImageUrl,
            mainImageAlt:mainImageAlt
        }
    )

    const refreshImage = (requestResponse) => {
        const haveMainImage = requestResponse.data.url !== undefined;
        const mainImageRootUrl = haveMainImage ? process.env.NEXT_PUBLIC_API_URL : "";//we dont add api path if it's local.
        const mainImageUrl = requestResponse?.data?.url ?? getDefaultImageByEntityType(entity?.type);
        const mainImageAlt = requestResponse?.data?.alt ?? "main image alt";
        setMainImageState({
            mainImage: requestResponse.data,
            haveMainImage: haveMainImage,
            mainImageRootUrl:mainImageRootUrl,
            mainImageUrl:mainImageUrl,
            mainImageAlt:mainImageAlt
        });
        //To correct modal to display properly
        entity.mainImage = requestResponse.data
    }

    return (
        <>
            <figure className={`${styles["main-image-container"]} mt-4 flex-grow-1`}>
                {mainImageState.haveMainImage &&
                    <a href={`/medias/${mainImageState?.mainImage?._id}`}
                        className={`fs-4 w-100 h-100 position-absolute d-flex align-items-center justify-content-center p-1 ${styles["profile-picture--modification-opt"]}`}>
                        Afficher
                    </a>
                }
                
                <img className={`${styles["main-image"]}`} src={mainImageState.mainImageRootUrl + mainImageState.mainImageUrl} alt={mainImageState.mainImageAlt}/>
                {
                    editableImg &&
                    <div className={`${styles["edit-image-button"]}`}>
                        <a onClick={() => displayModal()}>
                            <img src={"/icones/edit-icon.svg"} title={mainImageState.haveMainImage ? lang.updateImage : lang.addImage} alt={"Changer l'image"}/>
                        </a>
                    </div>
                }
            </figure>

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
                        initValues={mainImageState.mainImage}
                        entity={entity}
                        positiveRequestActions={{//CallbackFunction is one of the four behaviors the useFormUtils hook can apply when a request return a positive answer
                            callbackFunction: (requestResponse) => {
                                refreshImage(requestResponse);
                                closeModal();
                            }
                        }}
                    />
                </Modal>
            }
        </>
    )
}


export default MainImageDisplay