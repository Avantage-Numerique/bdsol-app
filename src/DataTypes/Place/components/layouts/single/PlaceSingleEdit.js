import React, {useCallback, useContext, useEffect, useState, useRef, useMemo} from "react";
import Router from "next/router";

//Utils
import Place from "../../../models/Place";
import {lang, modes} from "@/src/common/Data/GlobalConstants";
import {getDefaultUpdateEntityMeta} from "@/src/DataTypes/Meta/EntityMeta";
import {replacePathname} from "@/src/helpers/url";

//hooks
import {MessageContext} from "@/src/common/UserNotifications/Message/Context/Message-Context";
import {useFormUtils} from "@/src/hooks/useFormUtils/useFormUtils";
import {useAuth} from "@/src/authentification/context/auth-context";
import { useRootModal } from "@/src/hooks/useModal/useRootModal";


//Components
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase";
import SingleBaseHeader from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader";
import MainImageDisplay from "@/src/DataTypes/common/layouts/single/defaultSections/MainImageDisplay/MainImageDisplay";
import SubmitEntity from "@/src/DataTypes/common/Forms/SingleEdit/SubmitEntity";
import {SingleEntityMeta} from '@/src/DataTypes/Meta/components/SingleEntityMeta';
import Input from "@/src/common/FormElements/Input/Input";
import RichTextarea from "@/src/common/FormElements/RichTextArea/RichTextarea";
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";
import Button from '@/FormElements/Button/Button'
import Icon from "@/common/widgets/Icon/Icon";
import SingleSaveEntityReminder from '@/src/DataTypes/common/layouts/SingleSaveEntityReminder/SingleSaveEntityReminder';
import SingleBeforeUnloadReminder from "@/src/DataTypes/common/layouts/SingleSaveEntityReminder/SingleBeforeUnloadReminder";
import MapWrapper from "@/src/map/MapWrapper";
import Textarea from "@/src/common/FormElements/Textarea/Textarea";
import Select2 from "@/src/common/FormElements/Select2/Select2";


const PlaceSingleEdit = ({ positiveRequestActions, ...props}) => {

    let model = new Place(props.data);

    //Extract data
    const {
        createdAt,
        updatedAt,
        meta
    } = props.data;
    
    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    //Import message context 
    const msg = useContext(MessageContext);

    //Save intention for SingleBeforeUnloadReminder
    const [saveIntentionState, setSaveIntentionState] = useState(false);

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

    //Modal hook
    const modalSaveEntityReminder = useRootModal();

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
            shortDescription: {
                value: model.shortDescription ?? "",
                isValid: true,
            },
            address: {
                value: model?.location?.address ?? "",
                isValid: true,
            },
            city: {
                value: model?.location?.city ?? "",
                isValid: true,
            },
            region: {
                value: model?.location?.region ?? "",
                isValid: true,
            },
            mrc: {
                value: model?.location?.mrc ?? "",
                isValid: true,
            },
            province: {
                value: model?.location?.province ?? "",
                isValid: true,
            },
            postalCode: {
                value: model?.location?.postalCode ?? "",
                isValid: true,
            },
            country: {
                value: model?.location?.country ?? "",
                isValid: true,
            },
            latitude: {
                value: model?.location?.latitude ?? "",
                isValid: false,
            },
            longitude: {
                value: model?.location?.longitude ?? "",
                isValid: false,
            },
            placeType: {
                value: model?.placeType ?? [],
                isValid: true
            }
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
                placeType: formState.inputs.placeType.value?.length > 0 ?
                    formState.inputs.placeType.value.map( (elem) => {
                        return elem.value
                    })
                    :[],
                description: formState.inputs.description.value,
                shortDescription: formState.inputs.shortDescription.value,
                location: {
                    address: formState.inputs.address.value,
                    city: formState.inputs.city.value,
                    region: formState.inputs.region.value,
                    mrc: formState.inputs.mrc.value,
                    province: formState.inputs.province.value,
                    postalCode: formState.inputs.postalCode.value,
                    country: formState.inputs.country.value,
                    latitude: formState.inputs.latitude.value !== "" ? formState.inputs.latitude.value : undefined,
                    longitude: formState.inputs.longitude.value !== "" ? formState.inputs.longitude.value : undefined,
                },
                meta: getDefaultUpdateEntityMeta(auth.user, model.meta.requestedBy)
            }
        };

        //Send the request with the specialized hook
        submitRequest(
            `/places/update`,
            'POST',
            formData
        );
    }


    const breadcrumbLabels = {
        "contribuer": lang.menuContributeLabel,
        "lieux": lang.Places,
        "slug": model.name ?? '-'
    };

    const breadcrumbsRoutes = {
        route: model.singleEditRoute,
        labels: breadcrumbLabels,
    }

    const [breadCrumb, setBreadCrumb] = useState(breadcrumbsRoutes);
    useEffect(() => {
        setBreadCrumb(breadcrumbsRoutes)
    }, [model.title]);

    //Map setup section
    //Memoize props that are passed to the map
    const centerAt = useMemo(() => {
        return [model?.location?.latitude, model?.location?.longitude];
    }, []);
      
    const locationList = useMemo(() => {
    return [
        {
            name: model.name,
            location: {
                latitude : model?.location?.latitude,
                longitude : model?.location?.longitude
            },
            slug: model.slug
        }
    ];
    }, []);

    //Map update latitude and longitude
    const [latLng, setLatLng] = useState([model?.location?.latitude ?? "", model?.location?.longitude ?? ""]);
    useEffect( () => {
        formTools.inputHandler(
            "latitude",
            latLng?.lat,
            true,
        );
        formTools.inputHandler(
            "longitude",
            latLng?.lng,
            true,
        );
    },[latLng])


    const title = (
        <>
            <Input 
                name="name"
                label={lang.name+lang.required}
                formClassName="discrete-without-focus form-text-white h2"
                validationRules={[
                    {name: "REQUIRED"}
                ]}
                formTools={formTools}
            />
        </>
    );

    const ctaHeaderSection = (
        <div className="d-flex flex-wrap align-items-end justify-content-between gap-2 gap-md-3 gap-lg-4">
            <MainImageDisplay buttonClasses="fs-6" mainImage={currentMainImage} entity={currentModel}
                              setter={updateModelMainImage}/>
            <div className="d-flex flex-wrap align-items-end justify-content-between gap-2 gap-md-3 gap-lg-4">
                <Button className='fs-6' size="slim" color="success" disabled={!formState.isValid}
                    onClick={() => {setSaveIntentionState(true);modalSaveEntityReminder.displayModal()}}
                >
                    <Icon iconName={"save"}/>&nbsp;{lang.capitalize("save")}
                </Button>
                <Button className='fs-6' size="slim" color="primary-light" href={model.singleLink}>
                    <Icon iconName={"times"}/>&nbsp;{lang.Cancel}
                </Button>
            </div>
        </div>
    )

    const header = (
        <SingleBaseHeader
            className={"mode-update"}
            title={title} 
            subtitle={<div/>} 
            mainImage={currentMainImage}
            buttonSection={ctaHeaderSection}
            entity={model}
            mode={modes.CONTRIBUTING}
        >
        </SingleBaseHeader>
    );
    
    const fullWidthContent = (
        <>
            <SingleInfo
                title={lang.about}
            >
                {/* Description */}
                <RichTextarea
                    name="description"
                    formTools={formTools}
                />

            </SingleInfo>

            <Textarea 
                name="shortDescription"
                label={lang.shortDescription}
                formTools={formTools}
            />
        </>
    )
    const contentColumnLeft = (
        <>
            <SingleInfo
                title="Coordonnées"
            >
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
            </SingleInfo>

        </>
    )
    const contentColumnRight = (
        <SingleInfo
            title="Informations supplémentaires"
            cardLayout
        >
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

            {/* placeType */}
            <Select2
                name="placeType"
                label={lang.placeType}
                formTools={formTools}
                creatable={false}
                //modalType={TYPE_TAXONOMY}
                //allowedCategories={["placeType"]}
                isMulti={true}

                fetch={"/taxonomies/placeType"}
                searchField={"name"}
                selectField={"name"}
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
            <MapWrapper
                className=""
                height="300px"
                coordinatePopUp={true}
                locationList={locationList}
                centerAt={centerAt}
                setLatLng={setLatLng}
            />
        </SingleInfo>
    )
    {/*********** Footer section ***********/}
    const Footer = (
        <>
            {
                (createdAt || updatedAt || meta) &&
                <SingleInfo
                    title={lang.entityMetadata}
                    className="border-top pt-3"
                >
                    {/*********** Entity data ***********/}
                    <SingleEntityMeta createdAt={createdAt} updatedAt={updatedAt} meta={meta} />
                </SingleInfo>
            }
        </>
    )

    {/*********** Submit section ***********/}
    const SinglePageBottom = (
        <SubmitEntity submitHandler={() => {setSaveIntentionState(true); modalSaveEntityReminder.displayModal()}} formState={formState} />
    )
    

    return (
        <>
            <SingleBeforeUnloadReminder formTools={formTools} saveIntention={saveIntentionState}/>
            <SingleBase
                breadCrumb={breadCrumb}
                header={header}
                fullWidthContent={fullWidthContent}
                contentColumnLeft={contentColumnLeft}
                contentColumnRight={contentColumnRight}
                singlePageBottom={SinglePageBottom}
                footer={Footer}
            />
            <modalSaveEntityReminder.Modal>
                <SingleSaveEntityReminder
                    submitHandler={submitHandler}
                    closeModal={() => {modalSaveEntityReminder.closeModal(); setSaveIntentionState(false)}}
                />
            </modalSaveEntityReminder.Modal>
        </>
    )
}
export default PlaceSingleEdit;