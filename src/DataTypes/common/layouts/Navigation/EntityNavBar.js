import Button from "@/FormElements/Button/Button";
import {lang} from "@/common/Data/GlobalConstants";
import React from "react";
import {useModal} from "@/src/hooks/useModal/useModal";
import Router from "next/router";
import {useAuth} from "@/auth/context/auth-context";


const EntityNavBar = ({ entity, containerClass, ModalForm, modalParams }) => {

    const backUrl = "/";
    const type = entity.type ?? "persons";
    const closingModalBaseURI = `/${type.toLowerCase()}s/`;
    const modalParameters = modalParams ?? {};

    const {displayModal, modal, closeModal, Modal} = useModal();

    const auth = useAuth();

    const displayUpdateForm = () => {
        displayModal();
    }

    console.log("EntityNavBar modal params", modalParams);

    return (
        <>
            <div className={`container ${containerClass}`}>
                <div className="row justify-content-between mb-4">
                    <div className="col-6 col-lg-8 justify-content-end">
                        <a className="text-white" href={backUrl} title={lang.back}> &#8629; {lang.back}</a>
                    </div>
                    {auth.user.isLoggedIn &&
                        <div className={"col-auto col-lg-4 d-flex justify-content-end"}>
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
        </>
    )
}

export default EntityNavBar;