import {useCallback, useContext, useEffect, useRef} from 'react';
import Router from 'next/router';
import Link from 'next/link'

//Custom hooks
import {useFormUtils} from '@/src/hooks/useFormUtils/useFormUtils'
import {useModal} from '@/src/hooks/useModal/useModal';

//components
import Button from '@/FormElements/Button/Button'
import Input from '@/FormElements/Input/Input'
import SelectFetch from '@/FormElements/Select/SelectFetch'
import Select2 from '@/FormElements/Select2/Select2'
import SingleBaseHeader from '@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader';
import RichTextarea from '@/src/common/FormElements/RichTextArea/RichTextarea';
import SingleInfo from '@/src/DataTypes/common/layouts/SingleInfo/SingleInfo';
import {SingleEntityStatus} from '@/DataTypes/Status/components/SingleEntityStatus';
import SingleBase from '@/src/DataTypes/common/layouts/single/SingleBase';
import UpdateTeams from '@/src/DataTypes/Organisation/components/forms/UpdateTeams/UpdateTeams';
import CreateTaxonomyForm from '@/src/DataTypes/Taxonomy/components/Forms/CreateTaxonomy/CreateTaxonomyForm';

//Utils
import {lang} from "@/src/common/Data/GlobalConstants";
import {getDefaultCreateEntityStatus} from "@/DataTypes/Status/EntityStatus";
import Project from "@/DataTypes/Project/models/Project";
import {replacePathname} from "@/src/helpers/url";

//Context
import {useAuth} from "@/src/authentification/context/auth-context";
import {MessageContext} from '@/src/common/UserNotifications/Message/Context/Message-Context';
import UpdateScheduleBudget from '@/src/DataTypes/Project/component/forms/UpdateScheduleBudget';
import UpdateSponsor from '@/src/DataTypes/Project/component/forms/UpdateSponsor';

const ProjectSingleEdit = (props) => {

    const {
        _id,
        name,
        slug,
        alternateName,
        entityInCharge,
        producer,
        description,
        url,
        contactPoint,
        location,
        team,
        mainImage,
        sponsor,
        scheduleBudget,
        skills,
        domains,
        context,
        status,
        type,
        createdAt,
        updatedAt,
    } = props.data;

    //Model de project
    const model = new Project(props.data);
    //Redirection link to the view page
    const link = "/"+replacePathname(model.singleRoute.pathname, {slug: model.slug});

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

    //Modal hook
    const {displayModal, modal, closeModal, Modal} = useModal();

       //Main form functionalities
       const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            name: {
                value: name ?? "",
                isValid: true
            },
            alternateName: {
                value: alternateName ?? "",
                isValid: true
            },
            entityInCharge: {
                value: entityInCharge ?? "",
                isValid: true
            },
            producer: {
                value: producer ?? "",
                isValid: true
            },
            description: {
                value: description ?? "",
                isValid: true
            },
            url: {
                value: url ?? "",
                isValid: true
            },
            contactPoint: {
                value: contactPoint ?? "",
                isValid: true
            },
            location: {
                value: location ?? "",
                isValid: true
            },
            team: {
                value: team ?? [],
                isValid: true
            },
            mainImage: {
                value: mainImage ?? "",
                isValid: true
            },
            sponsor: {
                value: sponsor ?? [],
                isValid: true
            },
            startDate: {
                value: scheduleBudget?.startDate ?? "",
                isValid: true
            },
            endDateEstimate: {
                value: scheduleBudget?.endDateEstimate ?? "",
                isValid: true
            },
            completionDate: {
                value: scheduleBudget?.completionDate ?? "",
                isValid: true
            },
            estimatedTotalBudget: {
                value: scheduleBudget?.estimatedTotalBudget ?? "",
                isValid: true
            },
            eta: {
                value: scheduleBudget?.eta ?? "",
                isValid: true
            },
            timeframe: {
                value: scheduleBudget?.timeframe ?? [],
                isValid: true
            },
            skills: {
                value: skills ?? [],
                isValid: true
            },
            domains: {
                value: domains ?? [],
                isValid: true
            },
            context: {
                value: context ?? "",
                isValid: true
            }
        },
        //Actions if the form turns out to be positive
        {
            displayResMessage: true,
            callbackFunction: (response) => {
                Router.push("/"+replacePathname(model.singleRoute.pathname, {slug: response.data.slug}))
            }
        }
    )

    const submitHandler = async event => {
        
        event.preventDefault();
        
        const formData = {
            "data": {
                id: _id,
                name: formState.inputs.name.value,
                alternateName: formState.inputs.alternateName.value,
                entityInCharge: formState.inputs.entityInCharge?.value?.value ?? null,
                producer: formState.inputs.producer.value?.value ?? null,
                description: formState.inputs.description.value,
                context: formState.inputs.context.value,
                sponsor: formState.inputs.sponsor.value.map( (singleSponsor) => {
                    return {
                        name: singleSponsor.value.name.value,
                        entity: singleSponsor.value.entity.value.value,
                        entityType: "Organisation"
                    }
                }),
                scheduleBudget: {
                    startDate: formState.inputs.startDate.value,
                    endDateEstimate: formState.inputs.endDateEstimate.value,
                    completionDate: formState.inputs.completionDate.value,
                    estimatedTotalBudget: formState.inputs.estimatedTotalBudget.value,
                    eta: formState.inputs.eta.value,
                    timeframe: formState.inputs.timeframe.value.map( (singleTimeframe) => {
                        return {
                            step: singleTimeframe.value.step.value,
                            eta: singleTimeframe.value.eta.value,
                            budgetRange: singleTimeframe.value.budgetRange.value,
                        }
                    }),
                },
                team:formState.inputs.team.value.map(function(singleTeam){
                    return {
                        status: singleTeam.status,
                        member: singleTeam.value.member.value.value,
                        role: singleTeam.value.role.value
                    }
                }),
                skills: formState.inputs.skills?.value?.length > 0 ? formState.inputs.skills.value.map( (selectOptionSkill) => {
                    return selectOptionSkill.value
                }) : [],
                domains: formState.inputs.domains?.value?.length > 0 ?
                    formState.inputs.domains.value.map( (elem) => {
                        return {
                            domain: elem.value,
                            status: getDefaultCreateEntityStatus(auth.user)
                        }
                    })
                    : [],
                contactPoint: formState.inputs.contactPoint.value,
                url: formState.inputs.url.value,
                status: getDefaultCreateEntityStatus(auth.user),
            }
        }
        
        //Add data to the formData
        submitRequest(
            "/projects/update",
            'POST',
            formData
        );
    }

    /* Needed for breadCrumb generator */
    const getLabelGenerator = useCallback((param, query) => {
        return {
            "contribuer": lang.menuContributeLabel,
            "projets": lang.Projects,
            "slug": name ?? "-"
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
            label="Nom du projet"
            formTools={formTools}
            formClassName="discrete-without-focus form-text-white h2"
            validationRules={[
                {name: "REQUIRED"}
            ]}
        />);
    const subtitle = (
        <>
            <Input 
                name="alternateName"
                label="Nom alternatif"        
                formClassName="discrete-without-focus form-text-white h4"
                formTools={formTools}
            />
            <Select2
                name="entityInCharge"
                label="Organisation en charge"
                formTools={formTools}
                creatable={false}
                isMulti={false}

                fetch={"/organisations/list"}
                searchField={"name"}
                selectField={"name"}
            />
            {/* Producer */}
            <Select2
                name="producer"
                label="Producteur"
                formTools={formTools}
                tooltip={{header:"Producteur", body:"Un producteur a une forme d'autorité sur le projet et participe à son financement."}}
                creatable={false}
                isMulti={false}

                fetch={"/organisations/list"}
                searchField={"name"}
                selectField={"name"}
            />

        </>);


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
            mainImage={mainImage} 
            buttonSection={ctaHeaderSection}
            entity={model}
            editableImg={true}
        /> 
    );

    const fullWidthContent = (
        <>
            {/* Description */}
            <RichTextarea
                className="mb-3"
                name="description"
                label="Description"
                formTools={formTools}
            />
            {/* Sponsor */}
            <UpdateSponsor
                name="sponsor"
                label="Partenaires"
                formTools={formTools}
                parentEntity={props.data}
            />
        </>
    );
    const contentColumnLeft = (
        <>
            { /* team */ }
            <UpdateTeams
                name="team"
                formTools={formTools}
                parentEntity={props.data}
                label="Éditez vos membre d'équipe"
            />
            { /* scheduleBudget */}
            <UpdateScheduleBudget
                name="scheduleBudget"
                formTools={formTools}
                label="Échéancier et budget"
                parentEntity={props.data}
            />
            
        </>
    );
    const contentColumnRight = (
        <>
            {/* Context */}
            <div className="mb-3">
                <SelectFetch
                    name="context"
                    label="Choisissez un contexte"
                    formTools={formTools}
                    noValueText={lang.noSelectedOption}
                    fetchOption="context-enum"
                />
            </div>
            <div className="mb-3">
                <Select2
                    name="skills"
                    label="Compétences liées au projet"
                    formTools={formTools}
                    creatable={true}
                    isMulti={true}
                    createOptionFunction={displayModalForSkills}
                    requestData={{name:""}}
                    fetch={"/taxonomies/list"}
                    searchField={"name"}
                    selectField={"name"}
                />
            </div>
            <Select2
                name="domains"
                label={lang.Domains}
                formTools={formTools}
                creatable={true}
                isMulti={true}
                createOptionFunction={displayModalForDomains}

                fetch={"/taxonomies/list"}
                requestData={{category:"domains", name:""}}
                searchField={"name"}
                selectField={"name"}
            />
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
            { /* location */}
            { /* Url */}
            <Input
                name="url"
                label="Hyperlien"
                type="url"
                className="mb-3"
                pattern="^https?:\/\/[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
                placeholder="Une url avec le https, exemple : https://siteWeb.com"
                formTools={formTools}
            />
            <div className="border-top border-bottom pt-2">
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
        </>
    );

    const modalCategoryMode = useRef("skills")
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
                    Soumettre les modifications
                </Button>
                {
                    !formState.isValid &&
                    <p className="p-2 mt-2 col-md-4 border border-danger rounded"><small>Attention, l'un des champs dans cette page n'est pas entré correctement et vous empêche de sauvegarder vos modifications.</small></p>
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

export default ProjectSingleEdit;