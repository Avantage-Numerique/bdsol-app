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
import Icon from "@/common/widgets/Icon/Icon";


//{ mainImage, entity, editable}
const MainImageDisplay = ({ mainImage, entity, setter }) => {

    const {displayModal, modal, closeModal, Modal} = useModal();

    const haveMainImage = mainImage !== undefined && mainImage !== "";

    const refreshImage = (requestResponse) => {
        setter(requestResponse.data);
        entity.mainImage = requestResponse.data;
    }
    return (
        <>
            <div className={`${styles["edit-image-button"]}`}>
                <button className={"btn btn-primary"} onClick={() => displayModal()} title={haveMainImage ? lang.updateImage : lang.addImage}>
                    <Icon iconName={"edit"} /> { mainImage.isDefault === true ?
                    lang.capitalize("addImage") : lang.capitalize("updateImage")
                }
                </button>
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
                                refreshImage(requestResponse);
                                closeModal();
                            }
                        }}
                        setter={setter}
                    />
                </Modal>
            }
        </>
    )
}


export default MainImageDisplay