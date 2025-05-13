import { useEffect, useState } from 'react'
import dynamic from "next/dynamic";
import Router from "next/router";

//Component
import PageHeader from '@/src/layouts/Header/PageHeader';
import Input from '@/src/common/FormElements/Input/Input';
import CreatePlaceFormSingle from '@/src/DataTypes/Place/components/forms/CreatePlaceForm/CreatePlaceFormSingle';
import Button from '@/src/common/FormElements/Button/Button';

//Utils
import {lang} from "@/src/common/Data/GlobalConstants";
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import {ssrCanAccess} from "@/auth/permissions/ssrCanAccess";
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils';
import { getDefaultCreateEntityMeta } from '@/src/DataTypes/Meta/EntityMeta';
import { useAuth } from '@/src/authentification/context/auth-context';
import Place from '@/src/DataTypes/Place/models/Place';
import {useRootModal} from '@/src/hooks/useModal/useRootModal'
import MapWrapper from '@/src/map/MapWrapper';
import { isValid } from 'date-fns';

const PlaceSingleEditPage = () => {

    //Authentication ref
    const auth = useAuth();
    //Modal
    const { Modal, displayModal, closeModal, modalInitValues } = useRootModal();

    const [isNomatimDisable, setIsNomatimDisable] = useState(false);
    const { formState, formTools, submitRequest } = useFormUtils(
        {
            name: {
                value: "",
                isValid: true
            },
            placeType: {
                value: [],
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
                isValid: false
            },
            longitude: {
                value: "",
                isValid: false
            },
            nomatimLatitude: {
                value: "",
                isValid: false
            },
            nomatimLongitude: {
                value: "",
                isValid: false
            },
        },
        {
            displayResMessage: true,     //Display a message to the user to confirm the succes
            callbackFunction: (response) => {
                //Execute additionnal function from parent component
            }
        }
    );

    const submitHandler = async event => {
        event.preventDefault();
        const formData = {
            "data": {
                name: formState.inputs.name.value,
                placeType: formState.inputs.placeType.value.length > 0 ?
                    formState.inputs.placeType.value.map( (elem) => {
                        return elem.value
                    })
                    :[],
                location: {
                    address: formState.inputs.address.value,
                    city: formState.inputs.city.value,
                    region: formState.inputs.region.value,
                    mrc: formState.inputs.mrc.value,
                    province: formState.inputs.province.value,
                    postalCode: formState.inputs.postalCode.value,
                    country: formState.inputs.country.value,
                    latitude: formState.inputs.latitude.value,
                    longitude: formState.inputs.longitude.value,
                },
                nomatimObject: nomatimResult ?? {},
                meta: getDefaultCreateEntityMeta(auth.user)
            }
        };

        //Send the request with the specialized hook
        const response = await submitRequest(
            `/places/create`,
            'POST',
            formData
        );

        const model = new Place(response.data);
        //Execute the redirection
        Router.push( model.singleEditLink )
    }

    function updateFormFromNomatim(nomatimObject){
        let concatAddress = "";
        //If nomatim sent an house number and a road concat them
        if(nomatimObject?.address?.house_number != undefined && nomatimObject?.address?.road != undefined){
            concatAddress = nomatimObject.address.house_number + ", " + nomatimObject.address.road;
        }
        else {
            concatAddress = nomatimObject?.address?.road ?? "" 
        }
        //Each field to update from nomatim search
        const updateObject = {
            address: concatAddress,
            city: nomatimObject?.address?.city,
            region: nomatimObject?.address?.region,
            province: nomatimObject?.address?.state,
            postalCode: nomatimObject?.address?.postcode,
            country: nomatimObject?.address?.country,
            latitude: formState.inputs.nomatimLatitude.value,
            longitude: formState.inputs.nomatimLongitude.value,
        }
        Object.keys(updateObject).forEach( (key) => {
            if(updateObject[key] != undefined){
                formTools.inputHandler(
                    key,
                    updateObject[key],
                    true
                );
            }
        });
    }

    //On map click, register the latitude and longitude
    const [latLng, setLatLng] = useState(null);
    useEffect( () => {
        formTools.inputHandler(
            "nomatimLatitude",
            latLng?.lat,
            true,
        );
        formTools.inputHandler(
            "nomatimLongitude",
            latLng?.lng,
            true,
        );
    },[latLng])


    const [nomatimResult, setNomatimResult] = useState(undefined);

    async function nomatimSearch(reverseGeoCoding=true){
        if(!isNomatimDisable){
            setIsNomatimDisable(true);
            setTimeout(() => {
                setIsNomatimDisable(false);
            }, 2000);
            //Check if lat and lng is set
            if(latLng?.lat == undefined && latLng?.lng == undefined){
                return;
            }
            const headers = {
                'User-Agent': 'Avnu (bonjour@avnu.ca)',
                'Referer': 'https://avnu.ca/'
            };
            let nomatimUrl = "https://nominatim.openstreetmap.org/reverse?format=json&"
            
            if(reverseGeoCoding){
                nomatimUrl+="lat="+latLng.lat+"&lon="+latLng.lng;
                //try{
                    const nomatimResponse = await fetch(nomatimUrl, { headers });
                    if(!nomatimResponse.ok){
                        //message error
                        return;
                    }
                    const nomatimData = await nomatimResponse.json();
                    setNomatimResult(nomatimData);
                    //updateFormFromNomatim(nomatimData);
                //}
                //catch{
                    //console.log("Failed to send to nomatim")
                //}
                displayModal();
            }
        }
        else {
            console.log("Not allowed nomatim search")
            //Veuillez attendre avant de faire une nouvelle recherche
        }
        
    }
    return (
        <div className="container">
            <PageHeader
                bg={"bg-primary-light"}
                textColor={"text-white"}
                htmlTitle={"Créer un lieu"}
                description="Lieu comprenant un aspect numérique ou offrant la possibilité d'accueillir des projets en lien avec le numérique.">
            </PageHeader>
                <div className="container py-4">
                    <div className="row">
                        {/* Place inputs*/ }
                        <section className="col-md-6">
                            <CreatePlaceFormSingle formTools={formTools}/>
                            <div className="d-flex justify-content-end">
                                <Button disabled={!formTools.formState.isValid} type="button" onClick={submitHandler}>{lang.continue}</Button>
                            </div>
                        </section>

                        {/* map */}
                        <section className="row col-md-6">
                            <div>Cliquer sur la carte pour trouver une latitude et longitude et remplir le formulaire par recherche.</div>
                            <div className='col-md-8 border-start'>
                                <Input
                                    name="nomatimLatitude"
                                    disabled={true}
                                    formClassName="discrete-without-focus form-text-black"
                                    label={"Latitude"}
                                    formTools={formTools}
                                />
                                <Input
                                    name="nomatimLongitude"
                                    disabled={true}
                                    formClassName="discrete-without-focus form-text-black"
                                    label={"Longitude"}
                                    formTools={formTools}
                                />
                                <Button className="" disabled={isNomatimDisable || latLng == undefined} onClick={ () => nomatimSearch() }>Rechercher l'adresse</Button>
                            </div>
                            <MapWrapper setLatLng={setLatLng} coordinatePopUp={true}/>
                        </section>
                        <Modal>
                            <header className={`d-flex justify-content-end`}>
                                Voulez-vous complété le formulaire avec ces données ?
                            <Button onClick={() => closeModal()}>Fermer</Button>
                            </header>
                            <ul>
                                <li>{lang.address + ": " + (nomatimResult?.address?.house_number ?? "- ") + ", " + (nomatimResult?.address?.road ?? "-")}</li>
                                <li>{lang.city + ": " + (nomatimResult?.address?.city ?? "-")}</li>
                                <li>{lang.region + ": " + (nomatimResult?.address?.region ?? "-")}</li>
                                <li>{lang.province + ": " + (nomatimResult?.address?.state ?? "-")}</li>
                                <li>{lang.postalCode + ": " + (nomatimResult?.address?.postcode ?? "-")}</li>
                                <li>{lang.country + ": " + (nomatimResult?.address?.country ?? "-")}</li>
                                <li>{lang.latitude + ": " + (nomatimResult?.lat ?? "-")}</li>
                                <li>{lang.longitude + ": " + (nomatimResult?.lon ?? "-")}</li>
                            </ul>
                            <Button onClick={() => { updateFormFromNomatim(nomatimResult); closeModal();}}>Compléter le formulaire</Button>
                            <Button onClick={() => closeModal()}>Annuler</Button>
                        </Modal>
                    </div>
                </div>
            
        </div>
    )

}

export const getServerSideProps = withSessionSsr(ssrCanAccess);

export default PlaceSingleEditPage