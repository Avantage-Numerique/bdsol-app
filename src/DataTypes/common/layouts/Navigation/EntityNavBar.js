import Button from "@/FormElements/Button/Button";
import {lang} from "@/common/Data/GlobalConstants";
import React from "react";
import {useModal} from "@/src/hooks/useModal/useModal";
import Router from "next/router";
import {useAuth} from "@/auth/context/auth-context";
import CreateMediaForm from "@/DataTypes/Media/components/forms/CreateMedia/CreateMediaForm";
//import style from "./EntityNavBar.module.scss";

const EntityNavBar = (props) => {

    const {
        entity,
        containerClass,
        //these modals, can be dry, but by a "manager like".
        ModalForm,
        modalParams,
        ModalMainImageForm,
        modalMainImageParams,
        modalMainImageControl,
    } = props;

    const backUrl = "/";
    const type = entity.type ?? "persons";
    const closingModalBaseURI = `/${type.toLowerCase()}s/`;

    const modalParameters = modalParams ?? {};
    const modalMainImageParameters = modalMainImageParams ?? {};

    const {displayModal, modal, closeModal, Modal} = useModal();

    const mainImageModalControl = modalMainImageControl ?? undefined;// ?? useModal()

    const auth = useAuth();

    const displayUpdateForm = () => {
        displayModal();
    }
// onClick={modalMainImageControl.displayModal}
    return (
        <>
            <div className={`container ${containerClass}`}>
                <div className="row justify-content-between mb-4">
                    <div className="col-6 col-lg-6 justify-content-end">
                        <div>
                            <a className="text-white" href={backUrl} title={lang.back}> &#8629; {lang.back}</a>
                        </div>
                    </div>
                    {auth.user.isLoggedIn &&
                        <div className={"col-auto col-lg-6 d-flex justify-content-end"}>
                            {mainImageModalControl !== undefined &&
                                <Button onClick={mainImageModalControl.displayModal} className={`btn btn-primary`}>
                                    <img src={"/icones/edit-icon.svg"} alt={"Changer l'image"}/> Modifier l'image
                                </Button>
                            }
                            <Button onClick={displayUpdateForm}>
                                {lang.proposeContentChangeLabel}
                            </Button>
                        </div>
                    }
                </div>
            </div>

            {
                modal.display &&
                <Modal
                    className={`${type}-form-modal`}
                    coloredBackground
                    darkColorButton
                    closingFunction={closeModal}
                >
                    <ModalForm
                        initValues={entity}
                        positiveRequestActions={{
                            //CallbackFunction is one of the four behaviors the useFormUtils hook can apply when a request return a positive answer
                            callbackFunction: requestResponse => {
                                //Redirect to the right path if the slug changes and otherwise, at least reflect the changes
                                if (requestResponse.data.slug !== undefined) {
                                    Router.push(`${closingModalBaseURI}${requestResponse.data.slug}`);

                                    //Close the modal
                                    closeModal()
                                } else {
                                    thow(new Error("Un problème est survenue."))
                                }
                            }
                        }}
                        {...modalParameters}
                    />
                </Modal>
            }

            {/******** Img Modal Display *********/}
            {
                mainImageModalControl && mainImageModalControl.modal.display &&
                <Modal
                    coloredBackground
                    darkColorButton
                >
                    <header className="d-flex justify-content-between align-items-center">
                        <h3 className="m-0 fs-4 fw-normal">Téléverser un ficher média</h3>
                        <Button onClick={mainImageModalControl.closeModal} size="slim">Fermer</Button>
                    </header>
                    {/* Separation line */}
                    <div className="border-bottom w-100 my-2"></div>
                    <CreateMediaForm
                        initValues={entity}
                        positiveRequestActions={{
                            //CallbackFunction is one of the four behaviors the useFormUtils hook can apply when a request return a positive answer
                            callbackFunction: requestResponse => {
                                //Reflect the changes
                                Router.push(`${closingModalBaseURI}${entity.slug}`);

                                //Close the modal
                                mainImageModalControl.closeModal();
                            }
                        }}
                        {...modalMainImageParameters}
                    />
                </Modal>
            }
        </>
    )
}

export default EntityNavBar;