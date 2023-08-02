import Button from "@/FormElements/Button/Button";
import {lang} from "@/common/Data/GlobalConstants";
import React from "react";
import {useModal} from "@/src/hooks/useModal/useModal";
import Router, {useRouter} from "next/router";
import {useAuth} from "@/auth/context/auth-context";
import CreateMediaForm from "@/DataTypes/Media/components/forms/CreateMedia/CreateMediaForm";
import Icon from "@/common/widgets/Icon/Icon";
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
        showUpdateMenu
    } = props;

    const backUrl = "/";
    const type = entity.type ?? "Person";
    const closingModalBaseURI = `/${type.toLowerCase()}s/`;

    const modalParameters = modalParams ?? {};
    const modalMainImageParameters = modalMainImageParams ?? {};

    const {displayModal, modal, closeModal, Modal} = useModal();

    //MainImageModalControl receives the modal hook reference. 
    const mainImageModalControl = modalMainImageControl ?? undefined;// ?? useModal()

    const showMenu = showUpdateMenu !== undefined ? showUpdateMenu : true;
    const showBackButton = false;

    const auth = useAuth();

    const displayUpdateForm = () => {
        displayModal();
    }

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

    const router = useRouter();

    return (
        <>
            <div className={`container ${containerClass}`}>
                <div className="row justify-content-between mb-4">
                    <div className="col-6 col-lg-6 justify-content-end">
                        {showBackButton &&
                            <div>
                                <button type="button" className="btn btn-outline-light" title={lang.back} onClick={() => router.back()}>
                                    <Icon iconName="chevron-circle-left" /> {lang.back}</button>
                            </div>
                        }
                    </div>
                    {auth.user.isLoggedIn && showMenu &&
                        <div className={"col-auto col-lg-6 d-flex justify-content-end"}>
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
                            callbackFunction: requestResponse => {  //CallbackFunction is one of the four behaviors the useFormUtils hook can apply when a request return a positive answer
                                redirectOnClosingHandler(requestResponse, closeModal, requestResponse.data.slug);
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
                        initValues={entity.mainImage}
                        entity={entity}
                        positiveRequestActions={{//CallbackFunction is one of the four behaviors the useFormUtils hook can apply when a request return a positive answer
                            callbackFunction: (requestResponse) => {
                                redirectOnClosingHandler(requestResponse, mainImageModalControl.closeModal, entity.slug);
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