import React from 'react'
import Button from "@/FormElements/Button/Button";
import Icon from "@/common/widgets/Icon/Icon";
import { lang } from "@/common/Data/GlobalConstants";

const SubmitEntity = ({ children, className, submitHandler, formTools, singleLink }) => {

    const formState = formTools.formState
    //List to guide the user to the invalid inputs soo they can correct it before submiting
    function mapInvalidInput() {
        const invalidInputsList = [];

        formTools.listInvalidInput().forEach((key, index) => {
            const displayText = formState.inputs[key].invalidMsg ?? lang[key] ?? (key + " - invalide");
            invalidInputsList.push(
                <li key={`invalidInput-${key}-${index}`}>{lang.capitalize(displayText)}</li>
            )
        })
        return invalidInputsList;
    }

    return (
        <div className={` ${className || "w-50"}`}>
            <div className='d-flex justify-content-center mb-2'>
                <b className='mb-2'>Souhaitez-vous enregistrer les modifications ?</b>
            </div>
            <div className='row'>

                {/* Cancel button */}
                <div className='col'>
                    {
                        singleLink &&
                        <Button
                            className='w-100 fs-4'
                            size="slim"
                            color="primary-light"
                            href={singleLink}
                        >
                            <Icon iconName={"times"} />
                        </Button>
                    }
                </div>

                {/* Submit button */}
                <div className='col'>
                    {
                        submitHandler &&
                        <Button
                            className="w-100 fs-4"
                            size="slim"
                            color="success"
                            disabled={!formState.isValid}
                            onClick={submitHandler}
                        >
                            <Icon iconName={"las la-check"} />
                        </Button>
                    }
                </div>
            </div>
            {
                !formState.isValid &&
                <>
                    <div className="p-2 mt-2 col-md-8 border border-danger rounded">
                        <p>{lang.validationFailedCantSave}</p>
                        <ul>
                            {mapInvalidInput()}
                        </ul>
                    </div>
                </>
            }
            {children && children}
        </div>
    )
}

export default SubmitEntity
//<p className="p-2 mt-2 col-md-4 border border-danger rounded"><small>{lang.validationFailedCantSave}</small></p>
