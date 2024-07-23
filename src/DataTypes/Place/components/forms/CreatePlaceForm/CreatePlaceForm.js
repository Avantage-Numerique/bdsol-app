import React from 'react'
import Router from 'next/router'

//Custom hooks
import {useFormUtils} from '@/src/hooks/useFormUtils/useFormUtils'

//components
import Button from '@/FormElements/Button/Button'
import Input from '@/FormElements/Input/Input'

//Context
import {useAuth} from "@/src/authentification/context/auth-context";

//Styling
import styles from './CreatePlaceForm.module.scss'

//Utils
import {getDefaultCreateEntityMeta} from "@/src/DataTypes/Meta/EntityMeta";
import { lang } from '@/src/common/Data/GlobalConstants'

const CreatePlaceForm = ({ onPositiveResponse, initValues }) => {
    
    //Authentication ref
    const auth = useAuth();

    //Main form functionalities
    const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            name: {
                value: initValues?.name || "",
                isValid: true
            },
            description: {
                value: "",
                isValid: true
            },
            address: {
                value: "",
                isValid: true
            },
            city: {
                value: "",
                isValid: true
            },
            region: {
                value: "",
                isValid: true
            },
            mrc: {
                value: "",
                isValid: true
            },
            province: {
                value: "",
                isValid: true
            },
            postalCode: {
                value: "",
                isValid: true
            },
            country: {
                value: "",
                isValid: true
            },
            latitude: {
                value: "",
                isValid: true
            },
            longitude: {
                value: "",
                isValid: true
            },
        },
        //Pass a set of rules to execute a valid response of an api request
        {
            displayResMessage: true,     //Display a message to the user to confirm the succes
            callbackFunction: (response) => {
                //Execute additionnal function from parent component
                if(onPositiveResponse) onPositiveResponse(response)
            }
        }
    );
    

    //Function to submit the form
    const submitHandler = async event => {

        event.preventDefault();

        const formData = {
            "data": {
                name: formState.inputs.name.value,
                description: formState.inputs.description.value,
                address: formState.inputs.address.value,
                city: formState.inputs.city.value,
                region: formState.inputs.region.value,
                mrc: formState.inputs.mrc.value,
                province: formState.inputs.province.value,
                postalCode: formState.inputs.postalCode.value,
                country: formState.inputs.country.value,
                latitude: formState.inputs.latitude.value,
                longitude: formState.inputs.longitude.value,
                meta: getDefaultCreateEntityMeta(auth.user)
            }
        };

        //Send the request with the specialized hook
        submitRequest(
            `/places/create`,
            'POST',
            formData
        );
    }

    return (
        
       <form 
            onSubmit={submitHandler} 
            className={`${styles["create-place-form"]}`}
        >
            <FormUI />
            <Input 
                name="name"
                label={lang.name+lang.required}
                className="col-12 col-md-6"
                validationRules={[{name: "REQUIRED"}]}
                errorText="Cette information est requise"
                formTools={formTools}
            />

            {/* address */}
            <Input
                className="mb-3"
                name="address"
                label={lang.address}
                placeholder={lang.placeAddressPlaceholder}
                formTools={formTools}
            />
            {/* city */}
            <Input
                className="mb-3"
                name="city"
                label={lang.city}
                placeholder={lang.placeCityPlaceholder}
                formTools={formTools}
            />
            {/* postalCode */}
            <Input
                className="mb-3"
                name="postalCode"
                label={lang.postalCode}
                placeholder={lang.placePostalCodePlaceholder}
                formTools={formTools}
            />
            {/* province */}
            <Input
                className="mb-3"
                name="province"
                label={lang.province}
                placeholder={lang.placeProvincePlaceholder}
                formTools={formTools}
            />
            {/* country */}
            <Input
                className="mb-3"
                name="country"
                label={lang.country}
                placeholder={lang.placeCountryPlaceholder}
                formTools={formTools}
            />
            {/* mrc */}
            <Input
                className="mb-3"
                name="mrc"
                label={lang.mrc}
                placeholder={lang.placeMrcPlaceholder}
                formTools={formTools}
            />
            {/* region */}
            <Input
                className="mb-3"
                name="region"
                label={lang.region}
                placeholder={lang.placeRegionPlaceholder}
                formTools={formTools}
            />
            {/* longitude */}
            <Input
                className="mb-3"
                name="longitude"
                label={lang.longitude}
                placeholder={lang.placeLongitudePlaceholder}
                formTools={formTools}
            />
            {/* latitude */}
            <Input
                className="mb-3"
                name="latitude"
                label={lang.latitude}
                placeholder={lang.placeLatitudePlaceholder}
                formTools={formTools}
            />

            <div className="d-flex justify-content-end">
                <Button disabled={!formState.isValid} type="button" onClick={submitHandler}>{lang.continue}</Button>
            </div>
        </form> 
    );
}

export default CreatePlaceForm
