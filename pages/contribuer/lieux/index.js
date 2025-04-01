import { useEffect, useState } from 'react'

//Component
import PageHeader from '@/src/layouts/Header/PageHeader';
import MapComponent from '@/src/common/Components/MapComponent';
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


const PlaceSingleEditPage = () => {

    //Authentication ref
    const auth = useAuth();

    const [isNomatimDisable, setIsNomatimDisable] = useState(false);
    const { formState, formTools, submitRequest } = useFormUtils(
        {
            name: {
                value: "",
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
                description: formState.inputs.description.value,
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
        submitRequest(
            `/places/create`,
            'POST',
            formData
        );
    }

    function updateFormFromNomatim(nomatimObject){
        let concatAddress = "";
        //If nomatim sent an house number and a road concat them
        if(nomatimObject?.address?.house_number != undefined && nomatimObject?.address?.road != undefined){
            concatAddress = nomatimObject.address.house_number + ", " + nomatimObject.address.road;
        }
        //Each field to update from nomatim search
        const updateObject = {
            address: concatAddress,
            city: nomatimObject?.address?.city,
            region: nomatimObject?.address?.region,
            province: nomatimObject?.address?.state,
            postalCode: nomatimObject?.address?.postcode,
            country: nomatimObject?.address?.country,
            latitude: nomatimObject?.lat,
            longitude: nomatimObject?.lon,
        }
        Object.keys(updateObject).forEach( (key) => {
            console.log("inputHandler update key : " + key + ", value : " + updateObject[key])
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
    const [latLng, setLatLng] = useState(undefined);
    useEffect( () => {
        console.log(latLng);
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
    useEffect( () => { console.log(nomatimResult); }, [nomatimResult]);

    async function nomatimSearch(reverseGeoCoding=true){
        console.log("Nomatim search function");
        if(!isNomatimDisable){
            setIsNomatimDisable(true);
            setTimeout(() => {
                setIsNomatimDisable(false);
            }, 2000);
            console.log("Allow nomatim search");
            //Check if lat and lng is set
            if(latLng?.lat == undefined && latLng?.lng == undefined){
                console.log("lat or lng not set");
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
                        console.log("Erreur de nomatim response not 'ok'")
                    }
                    const nomatimData = await nomatimResponse.json();
                    setNomatimResult(nomatimData);
                    updateFormFromNomatim(nomatimData);
                //}
                //catch{
                    //console.log("Failed to send to nomatim")
                //}
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
                description="Ici gît la page de création de lieu [...]">
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
                        <div>Cliquer sur la carte pour trouver une latitude et longitude afin de remplir le formulaire par recherche</div>
                        <div className='col-md-8 border-start'>
                            <Input
                                name="nomatimLatitude"
                                formClassName="discrete-without-focus form-text-white"
                                label={"Latitude"}
                                formTools={formTools}
                            />
                            <Input
                                name="nomatimLongitude"
                                formClassName="discrete-without-focus form-text-white"
                                label={"Longitude"}
                                formTools={formTools}
                            />
                            <Button className="" disabled={isNomatimDisable} onClick={ () => nomatimSearch() }>Rechercher l'adresse</Button>
                        </div>
                        <MapComponent className="" coordinatePopUp={true} setLatLng={setLatLng}/>
                    </section>
                </div>
            </div>
            
            
        </div>
    )

}

export const getServerSideProps = withSessionSsr(ssrCanAccess);

export default PlaceSingleEditPage