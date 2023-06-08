import { useContext, useEffect, useCallback } from 'react';
import Link from 'next/link'
import Router from 'next/router';

//Context
import { MessageContext } from '@/src/common/UserNotifications/Message/Context/Message-Context';

//Hooks
import {useAuth} from '@/auth/context/auth-context';
import {useFormUtils} from '@/src/hooks/useFormUtils/useFormUtils';
import { useModal } from '@/src/hooks/useModal/useModal';

//Component
import Select2Tag from '@/src/common/FormElements/Select2/Select2Tag';
import Button from '@/src/common/FormElements/Button/Button';
import Input from '@/src/common/FormElements/Input/Input';
import RichTextarea from '@/src/common/FormElements/RichTextArea/RichTextarea';
import CreateTaxonomyForm from '@/src/DataTypes/Taxonomy/Components/Forms/CreateTaxonomy/CreateTaxonomyForm';
import Modal from '@/src/hooks/useModal/Modal/Modal';

import {getDefaultUpdateEntityStatus} from "@/DataTypes/Status/EntityStatus";
import { getSelectedToFormData } from '@/src/common/FormElements/Select2/Select2Tag';
import styles from './CreateOrganisationForm.module.scss'
import {getDateFromIsoString} from "@/src/utils/DateHelper";
import SingleBase from '@/src/DataTypes/common/layouts/single/SingleBase';
import SingleBaseHeader from '@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader';
import SingleInfo from '@/src/DataTypes/common/layouts/SingleInfo/SingleInfo';
import { SingleEntityStatus } from '@/src/DataTypes/Status/Components/SingleEntityStatus';
import UpdateSkillGroup from '@/src/DataTypes/common/Forms/UpdateSkillGroup/UpdateSkillGroup';
import UpdateTeams from '../UpdateTeams/UpdateTeams';

//Utils 
import Organisation from '@/src/DataTypes/Organisation/models/Organisation';
import {replacePathname} from "@/src/helpers/url";
import {lang} from "@/src/common/Data/GlobalConstants";


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

    //Model de project
    const model = new Organisation(props.data);
    //Redirection link to the view page
    const link = "/"+replacePathname(model.singleRoute.pathname, {slug: model.slug});

    //Modal hook
    const modal = useModal()

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
            redirect: link

        })

    //Function to submit the form
    const submitHandler = async event => {

        event.preventDefault();

        console.log(formState)

        const formData = {
            "data": {
                id: _id,
                name: formState.inputs.name.value,
                description:  formState.inputs.description.value,
                url: formState.inputs.url.value,
                contactPoint: formState.inputs.contactPoint.value,
                fondationDate: formState.inputs.fondationDate.value,
                offers: formState.inputs.offers.value.map(function(off){
                    return {
                        status: off.status,
                        offer: off.value.offer.value,
                        skills: off.value.skills.value.map(skill => skill.skill._id)
                    }
                }),
                catchphrase: formState.inputs.catchphrase.value,
                domains: getSelectedToFormData(formState.inputs.domains.value, "domain", auth.user),
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
            "slug": name       
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
        <div className="d-flex flex-column align-items-end">
            <Button disabled={!formState.isValid} onClick={submitHandler}>Soumettre les modifications</Button>
            <Link href={link} >
                <button type="button" className="btn underlined-button text-white">Retour en visualisation</button>
            </Link>
        </div>
    )

    const header = ( 
        <SingleBaseHeader 
            title={title} 
            subtitle={subtitle} 
            type={type} 
            mainImage={mainImage}
            buttonSection={ctaHeaderSection}

        /> 
    );
    
    const fullWidthContent = (
        <RichTextarea
            className="py-3"
            name="description"
            label="Description"
            formTools={formTools}
        />
    );

    const contentColumnLeft = (
        <>
            <UpdateSkillGroup
                parentEntity={props.data}
                formTools={formTools}
                name="offers"
                label="Éditez vos groupes d'offres de services"
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
            <div className="mb-3 mt-3">
                <Select2Tag
                    label={lang.Domains}
                    searchField="name"
                    fetch="/taxonomies/list"
                    requestData={{category:"domains", name:""}}
                    name="domains"
                    idField="domain"
                    placeholder={lang.domainsInputPlaceholder}
                    formTools={formTools}
                    creatableModal={modal}
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
            <Input
                className="mb-3"
                name="fondationDate"
                label="Date de fondation"
                type="date"
                formTools={formTools}
            />
            <div className="border-top border-bottom pt-3">
                {
                    status?.state &&
                        <SingleInfo
                            title="Statut de l'entité">
                            <p>{status.state === 'accepted' ? "Acceptée" : "En attente d'approbation"}</p>
                        </SingleInfo>
                }
                {
                    (createdAt || updatedAt || status) &&
                    <SingleEntityStatus createdAt={createdAt} updatedAt={updatedAt} status={status} />
                }
            </div>
        </>);
    
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
                    Soumettre
                </Button>
                {
                    !formState.isValid &&
                    <p className="p-2 mt-2 col-md-4 border border-danger rounded"><small>Attention, l'un des champs dans cette page n'est pas entré correctement et vous empêche de sauvegarder vos modifications.</small></p>
                }
            </div>

            { modal.modal.display &&
                <Modal 
                    className={`${styles["taxonomy-modal"]}`}
                    coloredBackground
                    darkColorButton
                >
                    <header className={`d-flex`}>
                        <p>Le nouvel élément de taxonomie que vous ajoutez ici pourra ensuite être directement intégrée à votre formulaire.</p>
                        <Button onClick={modal.closeModal}>Fermer</Button>
                    </header>               
                      
                    {/* Separation line */}
                    <div className={`my-4 border-bottom`}></div>

                    <CreateTaxonomyForm 
                        name={modal.modal.enteredValues.name ? modal.modal.enteredValues.name : ''}   //Prefilled value
                        category="skills"
                        positiveRequestActions={{
                            //CallbackFunction is one of the four behaviors the useFormUtils hook can apply when a request return a positive answer
                            callbackFunction: requestResponse => {

                                //In this case, the modal callback receives the object to be passed which is the taxonomy item in the response of the request
                                modal.modal.callback(requestResponse.data)
                                
                                //Close the modal 
                                modal.closeModal()
                            }
                        }}
                    />

                </Modal>
            }
      
        
        </>
    )

}
export default OrganisationSingleEdit 