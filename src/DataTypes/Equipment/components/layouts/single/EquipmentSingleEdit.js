import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import Router from 'next/router'
import Link from 'next/link'

//Custom hooks
import {useFormUtils} from '@/src/hooks/useFormUtils/useFormUtils'
import {useModal} from '@/src/hooks/useModal/useModal'

//components
import Button from '@/FormElements/Button/Button'
import Input from '@/FormElements/Input/Input'
import RichTextarea from '@/FormElements/RichTextArea/RichTextarea'
import CreateTaxonomyForm from '@/DataTypes/Taxonomy/components/Forms/CreateTaxonomy/CreateTaxonomyForm'
import {lang} from "@/src/common/Data/GlobalConstants";
import Select2 from '@/src/common/FormElements/Select2/Select2'
import Modal from '@/src/hooks/useModal/Modal/Modal'
import {SingleEntityMeta} from '@/src/DataTypes/Meta/components/SingleEntityMeta'

//Context
import {useAuth} from "@/src/authentification/context/auth-context";
import {MessageContext} from '@/src/common/UserNotifications/Message/Context/Message-Context';

//FormData
import {getDefaultCreateEntityMeta} from "@/src/DataTypes/Meta/EntityMeta";
import SingleBaseHeader from '@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader'
import SingleBase from '@/src/DataTypes/common/layouts/single/SingleBase'
import {replacePathname} from "@/src/helpers/url";
import Icon from "@/common/widgets/Icon/Icon";
import MainImageDisplay from "@/DataTypes/common/layouts/single/defaultSections/MainImageDisplay/MainImageDisplay";
import {TYPE_TAXONOMY} from '@/src/DataTypes/Entity/Types'
import SubmitEntity from "@/DataTypes/common/Forms/SingleEdit/SubmitEntity";
import Equipment from '../../../models/Equipment'


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
    //not used : transmuteTaxonomyTargetInput
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
                //url: [{label: "Hyperlien", url:formState.inputs.url.value}],
                /*.map(function(singleOccupation){
                    return {
                        groupName: singleOccupation.value.groupName.value,
                        skills: singleOccupation.value.skills.value.map( (skill) => { return skill.value }),
                        subMeta: { order : singleOccupation.order }
                    }
                }),*/

                meta: getDefaultCreateEntityMeta(auth.user),
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
            "equipements": lang.Equipements,
            "slug": `${model.name}`
        }[param];
    }, []);

    /*****************************
     * 
     * 
     *  Sections
     * 
     * 
     ***************************/
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
                formTools={formTools}
                placeholder={lang.labelPlaceholder}
            />
        </div>
    );
    const subtitle = (
        <>

        </>);
    
    const ctaHeaderSection = (
        <div className="d-flex align-items-end">
            <Link href={model.singleLink} >
                <button type="button" className="btn underlined-button text-white"><Icon iconName={"eye"} />&nbsp;{lang.capitalize("visualize")}</button>
            </Link>
            <Button disabled={!formState.isValid} onClick={submitHandler}><Icon iconName={"save"} />&nbsp;{lang.capitalize("save")}</Button>
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
        >
            <MainImageDisplay mainImage={currentMainImage} entity={currentModel} setter={updateModelMainImage} />
        </SingleBaseHeader>
    );

    const fullWidthContent = (
        <>

        </>)

    const contentColumnLeft = (
        <div>
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
            <Input
                name="url"
                label={lang.url}
                formTools={formTools}
            />
        </div>
    )

    const contentColumnRight = (
        <>

        </>
    )

    const footer = (
        <>
            {
                (model.createdAt || model.updatedAt || model.meta) &&
                <SingleEntityMeta createdAt={model.createdAt} updatedAt={model.updatedAt} meta={model.meta} />
            }
        </>
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
                    fullWidthContent={fullWidthContent}
                    contentColumnLeft={contentColumnLeft}
                    contentColumnRight={contentColumnRight}
                    footer={footer}
                />
                <SubmitEntity submitHandler={submitHandler} formState={formState} />

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
