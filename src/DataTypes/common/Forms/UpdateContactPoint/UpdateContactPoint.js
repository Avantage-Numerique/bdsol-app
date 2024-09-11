import React, { useEffect, useRef } from 'react';

//context
import { lang } from '@/src/common/Data/GlobalConstants';

//components
import Input from '@/src/common/FormElements/Input/Input';
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils';


const UpdateContactPoint = ({model, name, formTools, ...props}) => {

    const contactFormUtils = useFormUtils(
        {
            tel: {
                value: model.contactPoint?.tel?.num ?? "",
                isValid: true
            },
            ext: {
                value: model.contactPoint?.tel?.ext ?? "",
                isValid: true
            },
            email: {
                value: model.contactPoint?.email?.address ?? "",
                isValid: true
            },
            website: {
                value: model.contactPoint?.website?.url ?? "",
                isValid: true
            },
        },
        //Pass a set of rules to execute a valid response of an api request
        {
            displayResMessage: true,
        }
    )
    
    //Update the main form state
    const { inputHandler, inputTouched } = formTools;
    useEffect( () => {
        inputHandler(name,
            {
                tel: {
                    num: contactFormUtils.formState.inputs.tel.value ?? "",
                    ext: contactFormUtils.formState.inputs.ext.value ?? "",
                },
                email: {
                    address: contactFormUtils.formState.inputs.email.value ?? "",
                },
                website: {
                    url: contactFormUtils.formState.inputs.website.value ?? "",
                },

            }, true)

        //Update touch input if sub-form has been touched
        if(contactFormUtils.formState.hasAnyInputBeenTouched){
            inputTouched(name)
        }
    },[contactFormUtils.formState.inputs])

    return (
        <>
            <div className="row">
                <Input
                    className="col py-2"
                    name="tel"
                    label={lang.phoneNumber}
                    formTools={contactFormUtils.formTools}
                />
                <Input
                    className="col py-2"
                    name="ext"
                    label={lang.phoneExtension}
                    formTools={contactFormUtils.formTools}
                />
            </div>
            <Input
                className="py-2"
                name="email"
                label={lang.email}
                formTools={contactFormUtils.formTools}
            />
            <Input
                className="py-2"
                name="website"
                label={lang.website}
                formTools={contactFormUtils.formTools}
            />
        </>
    )
};


export default UpdateContactPoint;