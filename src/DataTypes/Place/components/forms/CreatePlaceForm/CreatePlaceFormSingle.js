import React from 'react'

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


/* This form doesn't send the create request, and is just there for the UI layout.
    Need to pass a formTools that handles all those field to work :
    name, description, address, city, region, mrc, province, postalCode, country, latitude, longitude 
*/

const CreatePlaceFormSingle = ({ formTools, ...props }) => {

    return (
        
       <form className={`${styles["create-place-form"]}`}>
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
            {/* latitude */}
            <Input
                className="mb-3"
                name="latitude"
                label={lang.latitude}
                placeholder={lang.placeLatitudePlaceholder}
                formTools={formTools}
                validationRules={[{name: "IS_VALID_LATITUDE"}]}
            />
            {/* longitude */}
            <Input
                className="mb-3"
                name="longitude"
                label={lang.longitude}
                placeholder={lang.placeLongitudePlaceholder}
                formTools={formTools}
                validationRules={[{name: "IS_VALID_LONGITUDE"}]}
            />
        </form> 
    );
}

export default CreatePlaceFormSingle
