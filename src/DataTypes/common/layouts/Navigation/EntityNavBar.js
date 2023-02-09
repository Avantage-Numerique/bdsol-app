import Button from "@/FormElements/Button/Button";
import {lang} from "@/common/Data/GlobalConstants";
import React from "react";
import {useModal} from "@/src/hooks/useModal/useModal";


const EntityNavBar = ({ entity, containerClass, modalComponent }) => {

    const backUrl = "/";

    const {displayModal, modal, closeModal} = useModal()

    const displayUpdateForm = selectStatus => {
        displayModal();
    }
    return (
        <>
            <div className={`container ${containerClass}`}>
                <div className="row justify-content-between mb-4">
                    <div className="col-6 col-lg-8 justify-content-end">
                        <a className="text-white" href={backUrl} title={lang.back}> &#8629; {lang.back}</a>
                    </div>
                    <div className={"col-auto col-lg-4"}>
                        <Button onClick={displayUpdateForm}>
                            {lang.proposeContentChangeLabel}
                        </Button>
                    </div>
                </div>
            </div>
            {
                modal.display && modalComponent
            }
        </>
    )
}

export default EntityNavBar;