import React, {useCallback, useContext, useEffect, useState} from 'react'
import Router from 'next/router'

//Custom hooks
import {useFormUtils} from '@/src/hooks/useFormUtils/useFormUtils'
import {useModal} from '@/src/hooks/useModal/useModal'

//components
import Button from '@/FormElements/Button/Button'
import Input from '@/FormElements/Input/Input'
import {lang} from "@/src/common/Data/GlobalConstants";
import Select2 from '@/src/common/FormElements/Select2/Select2'
import {SingleEntityMeta} from '@/src/DataTypes/Meta/components/SingleEntityMeta'
import SingleInfo from "@/src/DataTypes/common/layouts/SingleInfo/SingleInfo";

//Context
import {useAuth} from "@/src/authentification/context/auth-context";
import {MessageContext} from '@/src/common/UserNotifications/Message/Context/Message-Context';

//FormData
import {getDefaultUpdateEntityMeta} from "@/src/DataTypes/Meta/EntityMeta";
import SingleBaseHeader from '@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader'
import SingleBase from '@/src/DataTypes/common/layouts/single/SingleBase'
import {replacePathname} from "@/src/helpers/url";
import Icon from "@/common/widgets/Icon/Icon";
import MainImageDisplay from "@/DataTypes/common/layouts/single/defaultSections/MainImageDisplay/MainImageDisplay";
import {TYPE_TAXONOMY} from '@/src/DataTypes/Entity/Types';
import SubmitEntity from "@/DataTypes/common/Forms/SingleEdit/SubmitEntity";
import Equipment from '../../../models/Equipment';
import UpdateSocialHandles from '../../../../common/Forms/UpdateSocialHandles/UpdateSocialHandles';


const EquipmentSingleEdit = ({ positiveRequestActions, ...props}) => {

    //Model de project
    let model = new Equipment(props.data);

    //  STATES

    const [currentMainImage, setCurrentMainImage] = useState(model.mainImage);
    const [currentModel, setCurrentModel] = useState(model);

    const updateEntityModel = useCallback((rawData) => {
        model = new Equipment(rawData);
        setCurrentMainImage(model.mainImage);
    }, [setCurrentModel]);

    const updateModelMainImage = useCallback((mainImage) => {
        setCurrentMainImage(mainImage);
        model.mainImage = mainImage;
        setCurrentModel(model);
    }, [setCurrentModel]);


    //Modal hook
    const {displayModal, modal, closeModal, Modal} = useModal();

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    //Import message context 
    const msg = useContext(MessageContext);

    /*
    First of all, verify if the user is logged in.
    If he isn't, then redirect him in the connexion page
    */
    useEffect(() => {
        if(!auth.user.isLoggedIn) {
            msg.addMessage({ 
                text: lang.needToBeConnectedToAccess,
                positive: false 
            })
            Router.push('/compte/connexion')
        }
    }, [auth.user.isLoggedIn]);

    //Main form functionalities
    const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            equipmentType: {
                value: model.equipmentType ?? "",
                isValid: false
            },
            label: {
                value: model.label ?? "",
                isValid: false
            },
            brand: {
                value: model.brand ?? "",
                isValid: true
            },
            modelName: {
                value: model.modelName ?? "",
                isValid: true
            },
            url: {
                value: model.url ?? [],
                isValid: true
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
    

    //Submit the form
    const submitHandler = async event => { 

        event.preventDefault();
        const formData = {
            data: {
                id: model._id,
                equipmentType: formState.inputs.equipmentType.value.value,
                label:  formState.inputs.label.value,
                brand: formState.inputs.brand.value,
                modelName: formState.inputs.modelName.value,
                url: formState.inputs.url.value.map(function(singleUrl){
                    return {
                        label: singleUrl.value.label.value,
                        url: singleUrl.value.url.value,
                        subMeta: { order : singleUrl.order }
                    }
                }),

                meta: getDefaultUpdateEntityMeta(auth.user, model.meta.requestedBy),
            }
        };

        submitRequest(
            `/equipment/update`,
            'POST',
            JSON.stringify(formData)
        );
    }

    /* Needed for breadCrumb generator */
    const getLabelGenerator = useCallback((param, query) => {
        return {
            "contribuer": lang.menuContributeLabel,
            "equipements": lang.Equipments,
            "slug": `${model.title ?? '-'}`
        }[param];
    }, []);

    const breadCrumb = {
        route: model.singleEditRoute,
        getLabelGenerator: getLabelGenerator
    }

    const title = (
        <div>
            <Select2
                name="equipmentType"
                label={lang.equipmentType}
                formTools={formTools}
                creatable={true}
                modalType={TYPE_TAXONOMY}
                isMulti={false}

                placeholder={lang.equipmentTypePlaceholder}
                fetch={"/taxonomies/list"}
                requestData={{category:"equipmentType", name:""}}
                searchField={"name"}
                selectField={"name"}
            />
            <Input
                name="label"
                label={lang.label}
                formClassName="discrete-without-focus form-text-white"
                formTools={formTools}
                placeholder={lang.labelPlaceholder}
            />
        </div>
    );
    const subtitle = (<></>);
    
    const ctaHeaderSection = (
        <div className="d-flex flex-wrap align-items-end gap-2 gap-md-3 gap-lg-4">
            <MainImageDisplay buttonClasses="fs-6" mainImage={currentMainImage} entity={currentModel} setter={updateModelMainImage} />
            <Button className='fs-6' size="slim" color="success" disabled={!formState.isValid} onClick={submitHandler}>
                <Icon iconName={"save"} />&nbsp;{lang.capitalize("save")}
            </Button>
            <Button className='fs-6' size="slim" color="primary-light" href={model.singleLink}>
                <Icon iconName={"times"} />&nbsp;{lang.capitalize("CancelChanges")}
            </Button>
        </div>
    )

    const header = ( 
        <SingleBaseHeader
            className={"mode-update"}
            title={title} 
            subtitle={subtitle} 
            mainImage={currentMainImage}
            buttonSection={ctaHeaderSection}
            entity={model}
        />
    );

    const contentColumnLeft = (
        <SingleInfo
            title={lang.productInformations}
            cardLayout
        >
            <Input
                name="brand"
                label={lang.brand}
                formTools={formTools}
            />
            <Input
                name="modelName"
                label={lang.modelName}
                formTools={formTools}
            />
        </SingleInfo>
    )

    const contentColumnRight = (
        <SingleInfo
            title={lang.url}
            cardLayout
        >
            <UpdateSocialHandles
                name="url"
                parentEntity={model}
                formTools={formTools}
            />
        </SingleInfo>
    )

    const footer = (
        <>
            {
                (model.createdAt || model.updatedAt || model.meta) &&
                <SingleInfo 
                    title={lang.entityMetadata} 
                    className="border-top pt-3"
                >
                    {/*********** Entity data ***********/}
                    <SingleEntityMeta createdAt={model.createdAt} updatedAt={model.updatedAt} meta={model.meta} />
                </SingleInfo>            
            }
        </>
    )

    
    {/*********** Submit section ***********/}
    const SinglePageBottom = (
        <SubmitEntity submitHandler={submitHandler} formState={formState} />
    )

    return (
        <>
        
          {/*   <form 
                onSubmit={submitHandler} 
                className={`${styles["create-person-form"]}`}
            >
            */}
                <SingleBase
                    breadCrumb={breadCrumb}
                    header={header}
                    contentColumnLeft={contentColumnLeft}
                    contentColumnRight={contentColumnRight}
                    footer={footer}
                    singlePageBottom={SinglePageBottom}
                />

             {/* </form> */}

            { /* modal.display && false &&
                <Modal 
                    className={`${styles["taxonomy-modal"]}`}
                    coloredBackground
                    darkColorButton
                >
                    <header className={`d-flex`}>
                        <p>Le nouvel élément de taxonomie que vous ajoutez ici pourra ensuite être directement intégrée à votre formulaire.</p>
                        <Button onClick={closeModal}>Fermer</Button>
                    </header>               
                      
                    {/* Separation line */}
                    {/*</><div className={`my-4 border-bottom`}></div>

                    <CreateTaxonomyForm
                        name={modal.enteredValues.name ?? ''}   //Prefilled value
                        initValues={ {name:modal.enteredValues.name} }
                        category={modalCategoryMode.current}
                        positiveRequestActions={{
                            //CallbackFunction is one of the four behaviors the useFormUtils hook can apply when a request return a positive answer
                            callbackFunction: requestResponse => {

                                //In this case, the modal callback receives the object to be passed which is the taxonomy item in the response of the request
                                //modal.callback(requestResponse.data)
                                
                                //Close the modal 
                                closeModal()
                            }
                        }}
                    /> 

                </Modal>*/
            }
        </>
    );
}

export default EquipmentSingleEdit;
