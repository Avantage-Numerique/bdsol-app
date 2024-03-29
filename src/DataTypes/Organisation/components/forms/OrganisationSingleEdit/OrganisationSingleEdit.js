import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import Link from 'next/link'
import Router from 'next/router';

//Context
import {MessageContext} from '@/src/common/UserNotifications/Message/Context/Message-Context';

//Hooks
import {useAuth} from '@/auth/context/auth-context';
import {useFormUtils} from '@/src/hooks/useFormUtils/useFormUtils';
import {useModal} from '@/src/hooks/useModal/useModal';

//Component
import Select2 from '@/src/common/FormElements/Select2/Select2';
import Button from '@/src/common/FormElements/Button/Button';
import Input from '@/src/common/FormElements/Input/Input';
import RichTextarea from '@/src/common/FormElements/RichTextArea/RichTextarea';
import CreateTaxonomyForm from '@/DataTypes/Taxonomy/components/Forms/CreateTaxonomy/CreateTaxonomyForm';
import Modal from '@/src/hooks/useModal/Modal/Modal';

import {getDefaultUpdateEntityStatus} from "@/DataTypes/Status/EntityStatus";
import {getDateFromIsoString} from "@/src/utils/DateHelper";
import SingleBase from '@/src/DataTypes/common/layouts/single/SingleBase';
import SingleBaseHeader from '@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader';
import SingleInfo from '@/src/DataTypes/common/layouts/SingleInfo/SingleInfo';
import {SingleEntityStatus} from '@/DataTypes/Status/components/SingleEntityStatus';
import UpdateSkillGroup from '@/src/DataTypes/common/Forms/UpdateSkillGroup/UpdateSkillGroup';
import UpdateTeams from '../UpdateTeams/UpdateTeams';

//Utils
import Organisation from '@/src/DataTypes/Organisation/models/Organisation';
import {replacePathname} from "@/src/helpers/url";
import {lang} from "@/src/common/Data/GlobalConstants";
import MainImageDisplay from "@/DataTypes/common/layouts/single/defaultSections/MainImageDisplay/MainImageDisplay";
import Icon from "@/common/widgets/Icon/Icon";


const OrganisationSingleEdit = (props) => {

    //Organisation data extract
    const {
        _id,
        name,
        description,
        url,
        contactPoint,
        fondationDate = null,
        offers,
        domains,
        team,
        mainImage,
        slug,
        catchphrase,
        status,
        type,
        createdAt,
        updatedAt,
    } = Object(props.data);

    //  Model de project
    let model = new Organisation(props.data);

    /*
     *  1. Change the link getter in ctaHeaderSection components.
     *  1.1 Change the button save and visualize.
     *  2. Add states setter
     *  2.1 Change the const to let for model.
     *  3. Pass new params to components.
     *  4. Test
     *  5. redo
     */

    //  STATES change that to a context ?

    const [currentMainImage, setCurrentMainImage] = useState(model.mainImage);
    const [currentModel, setCurrentModel] = useState(model);

    const updateEntityModel = useCallback((rawData) => {
        model = new Organisation(rawData);
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
        name: {
            value: name ?? '',
            isValid: false
        },
        description: {
            value: description ?? '',
            isValid: true
        },
        url: {
            value: url ?? '',
            isValid: true
        },
        contactPoint: {
            value: contactPoint ?? '',
            isValid: true
        },
        fondationDate: {
            value: fondationDate ? getDateFromIsoString(fondationDate) : "",
            isValid: true
        },
        catchphrase: {
            value: catchphrase ?? '',
            isValid: true
        },
        offers: {
            value: offers ?? [],
            isValid: true
        },
        domains: {
            value: domains ?? [],
            isValid: true
        },
        team: {
            value: team ?? [],
            isValid: true
        }
    }, {
            displayResMessage: true,     //Display a message to the user to confirm the succes
            callbackFunction: (response) => {
                Router.push("/"+replacePathname(model.singleRoute.pathname, {slug: response.data.slug}))
            }

        })

    //Function to submit the form
    const submitHandler = async event => {

        event.preventDefault();

        const formData = {
            "data": {
                id: _id,
                name: formState.inputs.name.value,
                description:  formState.inputs.description.value,
                url: formState.inputs.url.value,
                contactPoint: formState.inputs.contactPoint.value,
                fondationDate: formState.inputs.fondationDate.value,
                offers: formState.inputs.offers.value.map(function(singleOffer){
                    return {
                        status: singleOffer.status,
                        groupName: singleOffer.value.groupName.value,
                        skills: singleOffer.value.skills.value.map( (skill) => { return skill.value })
                    }
                }),
                catchphrase: formState.inputs.catchphrase.value,
                domains: formState.inputs.domains?.value?.length > 0 ?
                    formState.inputs.domains.value.map( (elem) => {
                        return {
                            domain: elem.value,
                            status: getDefaultUpdateEntityStatus(auth.user)
                        }
                    })
                    : [],
                team:formState.inputs.team.value.map(function(singleTeam){
                    return {
                        status: singleTeam.status,
                        member: singleTeam.value.member.value.value,
                        role: singleTeam.value.role.value
                    }
                }),
                status: getDefaultUpdateEntityStatus(auth.user)
            }
        };

        //Send the request with the specialized hook
        submitRequest(
            `/organisations/update`,
            'POST',
            formData
        );
    }

    /* Needed for breadCrumb generator */
    const getLabelGenerator = useCallback((param, query) => {
        return {
            "contribuer": lang.menuContributeLabel,
            "organisations": lang.Organisations,
            "slug": name ?? "-"
        }[param];
    }, []);

    /*****************************
     *  Sections
     ***************************/
    const breadCrumb = {
        route: model.singleEditRoute,
        getLabelGenerator: getLabelGenerator
    }

    const title = (
        <Input 
            name="name"
            placeholder="Nom de l'organisation"
            label="Nom de l'organisation"
            formClassName="discrete-without-focus form-text-white h2"
            validationRules={[
                {name: "REQUIRED"}
            ]}
            formTools={formTools}
        />);

    const subtitle = (
        <Input
            name="catchphrase"
            placeholder={lang.catchphrase}
            formClassName="discrete-without-focus form-text-white h4"
            label={lang.catchphrase}
            formTools={formTools}
        />);
    
    const ctaHeaderSection = (
        <div className="d-flex align-items-end">
            <Link href={model.singleLink} >
                <button type="button" className="btn underlined-button text-white"><Icon iconName={"eye"} />&nbsp;{lang.capitalize("visualize")}</button>
            </Link>
            <Button disabled={!formState.isValid} onClick={submitHandler}><Icon iconName={"save"} />&nbsp;{lang.capitalize("save")}</Button>
        </div>
    );

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
        <SingleInfo
            title="Description"
            classNameH4="mb-0"
        >
            <RichTextarea
                className="py-3"
                name="description"
                formTools={formTools}
            />
        </SingleInfo>
    );

    const contentColumnLeft = (
        <>
            <UpdateSkillGroup
                parentEntity={props.data}
                formTools={formTools}
                name="offers"
                label="Éditez vos groupes d'offres de services"
                //createOptionFunction={displayModalForSkills}
            />
            { /* team */ }
            <UpdateTeams
                name="team"
                formTools={formTools}
                parentEntity={props.data}
                label="Éditez vos membre d'équipe"
            />
        </>
    );

    const contentColumnRight = (
        <>
            <SingleInfo
                title="Informations supplémentaires"
                classNameH4="mb-0"
                className="mt-3"
            >
                <div className="mb-3 mt-3">
                    <Select2
                        name="domains"
                        label={lang.Domains}
                        formTools={formTools}
                        creatable={true}
                        isMulti={true}
                        //createOptionFunction={displayModalForDomains}

                        placeholder={lang.domainsInputPlaceholder}
                        fetch={"/taxonomies/list"}
                        requestData={{category:"domains", name:""}}
                        searchField={"name"}
                        selectField={"domains"}
                    />
                </div>
                <Input
                    className="mb-3"
                    name="contactPoint"
                    label="Information de contact"
                    tip={{
                        header: "À noter",
                        body: "Cette information vise à offrir une option pour rejoindre un représentant de l'organisation."
                    }}
                    placeholder="Adresse courriel, numéro de téléphone, etc..."
                    formTools={formTools}
                />
                <Input
                    className="mb-3"
                    name="fondationDate"
                    label="Date de fondation"
                    type="date"
                    formTools={formTools}
                />
            </SingleInfo>
        </>
    );

    const footer = (
        <>
            <Input
                name="url"
                className="mb-3"
                label="Hyperlien"
                type="url"
                pattern="^https?:\/\/[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
                placeholder="Une url avec le https, exemple : https://siteWeb.com"
                formTools={formTools}
            />
            <div className="border-top border-bottom pt-3">
                {
                    (createdAt || updatedAt || status) &&
                    <SingleEntityStatus createdAt={createdAt} updatedAt={updatedAt} status={status} />
                }
            </div>
        </>);


    const modalCategoryMode = useRef("skills");

    function displayModalForSkills(elem) {
        modalCategoryMode.current = "skills";
        modal.enteredValues.name = elem;
        displayModal();
    }

    function displayModalForDomains(elem) {
        modalCategoryMode.current = "domains";
        modal.enteredValues.name = elem;
        displayModal();
    }
    
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

            <div className="d-flex pt-4 align-items-end flex-column">
                <Button disabled={!formState.isValid} onClick={submitHandler}>
                    {lang.save}
                </Button>
                {
                    !formState.isValid &&
                    <p className="p-2 mt-2 col-md-4 border border-danger rounded"><small>{lang.validationFailedCantSave}</small></p>
                }
            </div>

            { modal.display &&
                <Modal 
                    coloredBackground
                    darkColorButton
                >
                    <header className={`d-flex`}>
                        <p>Le nouvel élément de taxonomie que vous ajoutez ici pourra ensuite être directement intégrée à votre formulaire.</p>
                        <Button onClick={closeModal}>Fermer</Button>
                    </header>               
                      
                    {/* Separation line */}
                    <div className={`my-4 border-bottom`}></div>

                    <CreateTaxonomyForm 
                        name={modal.enteredValues.name ?? ''}   //Prefilled value
                        initValues={ {name:modal.enteredValues.name} }
                        category={modalCategoryMode.current}
                        positiveRequestActions={{
                            //CallbackFunction is one of the four behaviors the useFormUtils hook can apply when a request return a positive answer
                            callbackFunction: requestResponse => {

                                //In this case, the modal callback receives the object to be passed which is the taxonomy item in the response of the request
                                //modal.modal.callback(requestResponse.data)
                                
                                //Close the modal 
                                closeModal()
                            }
                        }}
                    />
                </Modal>
            }
        
        </>
    )

}
export default OrganisationSingleEdit 
