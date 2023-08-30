import { useCallback, useState, useEffect, useContext } from "react";
import Router from "next/router";

//Utils
import Place from "../../../models/Place";
import { lang } from "@/src/common/Data/GlobalConstants";
import { getDefaultUpdateEntityStatus } from "@/src/DataTypes/Status/EntityStatus";
import {replacePathname} from "@/src/helpers/url";

//hooks
import { useModal } from "@/src/hooks/useModal/useModal";
import { MessageContext } from "@/src/common/UserNotifications/Message/Context/Message-Context";
import { useFormUtils } from "@/src/hooks/useFormUtils/useFormUtils";
import { useAuth } from "@/src/authentification/context/auth-context";

//Components
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase";
import SingleBaseHeader from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader";
import MainImageDisplay from "@/src/DataTypes/common/layouts/single/defaultSections/MainImageDisplay/MainImageDisplay";
import SubmitEntity from "@/src/DataTypes/common/Forms/SingleEdit/SubmitEntity";
import Input from "@/src/common/FormElements/Input/Input";
import RichTextarea from "@/src/common/FormElements/RichTextArea/RichTextarea";


const PlaceSingleEdit = ({ positiveRequestActions, ...props}) => {

    let model = new Place(props.data);
    
    //Modal hook
    const {displayModal, modal, closeModal, Modal} = useModal();

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    //Import message context 
    const msg = useContext(MessageContext);

    const [currentMainImage, setCurrentMainImage] = useState(model.mainImage);
    const [currentModel, setCurrentModel] = useState(model);

    const updateEntityModel = useCallback((rawData) => {
        model = new Place(rawData);
        setCurrentMainImage(model.mainImage);
    }, [setCurrentModel]);

    const updateModelMainImage = useCallback((mainImage) => {
        setCurrentMainImage(mainImage);
        model.mainImage = mainImage;
        setCurrentModel(model);
    }, [setCurrentModel]);

    //Auth logged in
    useEffect(() => {
        if(!auth.user.isLoggedIn) {
            msg.addMessage({ 
                text: lang.needToBeConnectedToAccess,
                positive: false 
            })
            Router.push('/compte/connexion')
        }
    }, [auth.user.isLoggedIn]);

    const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            name: {
                value: model.name ?? "",
                isValid: true,
            },
            description: {
                value: model.description ?? "",
                isValid: true,
            },
            address: {
                value: model.address ?? "",
                isValid: true,
            },
            city: {
                value: model.city ?? "",
                isValid: true,
            },
            region: {
                value: model.region ?? "",
                isValid: true,
            },
            mrc: {
                value: model.mrc ?? "",
                isValid: true,
            },
            province: {
                value: model.province ?? "",
                isValid: true,
            },
            postalCode: {
                value: model.postalCode ?? "",
                isValid: true,
            },
            country: {
                value: model.country ?? "",
                isValid: true,
            },
            latitude: {
                value: model.latitude ?? "",
                isValid: true,
            },
            longitude: {
                value: model.longitude ?? "",
                isValid: true,
            },
        },
        //Pass a set of rules to execute a valid response of an api request
        {
            displayResMessage: true,
            callbackFunction: (response) => {
                Router.push("/"+replacePathname(model.singleRoute.pathname, {slug: response.data.slug}))
            }
        }
    );

    //Function to submit the form
    const submitHandler = async event => {

        event.preventDefault();

        const formData = {
            "data": {
                id: model._id,
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
                status: getDefaultUpdateEntityStatus(auth.user)
            }
        };

        //Send the request with the specialized hook
        submitRequest(
            `/places/update`,
            'POST',
            formData
        );
    }

    const getLabelGenerator = useCallback((param, query) => {
        return {
            "contribuer": lang.menuContributeLabel,
            "lieux": lang.Places,
            "slug": model.name ?? '-'
        }[param];
    }, []);

    const breadCrumb = {
        route: model.singleEditRoute,
        getLabelGenerator: getLabelGenerator
    }

    const title = (
        <>
            <Input 
                name="name"
                label={lang.name}
                className="col-12 col-md-6"
                formClassName="discrete-without-focus form-text-white h2"
                validationRules={[
                    {name: "REQUIRED"}
                ]}
                errorText="Cette information est requise"
                formTools={formTools}
            />
        </>
    );

    const header = ( 
        <SingleBaseHeader
            className={"mode-update"}
            title={title} 
            subtitle={<div/>} 
            mainImage={currentMainImage}
            //buttonSection={ctaHeaderSection}
            entity={model}
        >
            <MainImageDisplay mainImage={currentMainImage} entity={currentModel} setter={updateModelMainImage} />
        </SingleBaseHeader>
    );
    const fullWidthContent = (
        <div className="row">
            {/* Description */}
            <RichTextarea
                className="mb-3 mt-2"
                name="description"
                label={lang.description}
                formTools={formTools}
            />
        </div>
    )
    const contentColumnLeft = (
        <>
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
        </>
    )
    const contentColumnRight = (
        <>
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
        </>
    )
    const footer = (
        <></>
    )

    return (
        <>
            <SingleBase
                breadCrumb={breadCrumb}
                header={header}
                fullWidthContent={fullWidthContent}
                contentColumnLeft={contentColumnLeft}
                contentColumnRight={contentColumnRight}
                footer={footer}
            />
            <SubmitEntity submitHandler={submitHandler} formState={formState} />
        </>
    )
}
export default PlaceSingleEdit;