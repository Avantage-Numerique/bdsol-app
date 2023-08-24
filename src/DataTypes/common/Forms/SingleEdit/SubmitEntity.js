import React from 'react'
import Button from "@/FormElements/Button/Button";
import Icon from "@/common/widgets/Icon/Icon";
import {lang} from "@/common/Data/GlobalConstants";

const SubmitEntity = ({ children, className, submitHandler, formState }) => {

    return (
        <div className={`d-flex pt-4 align-items-end flex-column ${className}`}>
            <Button disabled={!formState.isValid} onClick={submitHandler}>
                <Icon iconName={"save"} />&nbsp;{lang.submitModification}
            </Button>
            {
                !formState.isValid &&
                <p className="p-2 mt-2 col-md-4 border border-danger rounded"><small>{lang.validationFailedCantSave}</small></p>
            }
            { children && children}
        </div>
    )
}

export default SubmitEntity