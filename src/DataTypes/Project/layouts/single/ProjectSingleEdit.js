import React, {useEffect} from 'react';

//Custom hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils'

//Components
import Button from '@/FormElements/Button/Button'
import Input from '@/FormElements/Input/Input'
import SelectFetch from '@/FormElements/Select/SelectFetch'
import Select2 from '@/FormElements/Select2/Select2'
import SingleBaseHeader from '@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader';
import RichTextarea from '@/src/common/FormElements/RichTextArea/RichTextarea';
import SingleInfo from '@/src/DataTypes/common/layouts/SingleInfo/SingleInfo';
import { SingleEntityStatus } from '@/src/DataTypes/Status/Components/SingleEntityStatus';
import SingleBase from '@/src/DataTypes/common/layouts/single/SingleBase';
import UpdateSkillGroup from '@/src/DataTypes/common/Forms/UpdateSkillGroup/UpdateSkillGroup';
import UpdateTeams from '@/src/DataTypes/Organisation/components/forms/UpdateTeams/UpdateTeams';

//Utils 
import {lang} from "@/src/common/Data/GlobalConstants";
import {getDefaultCreateEntityStatus} from "@/DataTypes/Status/EntityStatus";

//Context
import { useAuth } from "@/src/authentification/context/auth-context";


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
        context,
        status,
        type,
        createdAt,
        updatedAt,
    } = props.data;

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
            scheduleBudget: {
                value: scheduleBudget ?? "",
                isValid: true
            },
            skills: {
                value: skills ?? [],
                isValid: true
            },
            context: {
                value: context ?? "",
                isValid: true
            }
        })

    //Authentication ref
    const auth = useAuth();

    const submitHandler = async event => {
        
        event.preventDefault();
        
        const formData = {
            "data": {
                id: _id,
                name: formState.inputs.name.value,
                alternateName: formState.inputs.alternateName.value,
                entityInCharge: formState.inputs.entityInCharge.value.value,
                producer: formState.inputs.producer.value.value,
                description: formState.inputs.description.value,
                context: formState.inputs.context.value,
                //sponsor: formState.inputs.sponsor.value,
                offers: formState.inputs.offers.value,
                team:formState.inputs.team.value.map(function(singleTeam){
                    return {
                        status: singleTeam.status,
                        member: singleTeam.value.member.value.value,
                        role: singleTeam.value.role.value
                    }
                }),
                contactPoint: formState.inputs.contactPoint.value,
                url: formState.inputs.url.value,
                status: getDefaultCreateEntityStatus(auth.user),
            }
        }
        
        //Add data to the formData
        await submitRequest(
            "/projects/create",
            'POST',
            formData
        );
    }

    const title = (
        <Input 
            name="name"
            label="Nom du projet"
            formTools={formTools}
            validationRules={[
                {name: "REQUIRED"}
            ]}
        />);
    const subtitle = (
        <>
            <Input 
                name="alternateName"
                label="Nom alternatif"
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
                creatable={false}
                isMulti={false}

                fetch={"/organisations/list"}
                searchField={"name"}
                selectField={"name"}
            />

        </>);
    const header = ( <SingleBaseHeader title={title} subtitle={subtitle} type={type} mainImage={mainImage} /> );
    const fullWidthContent = (
        <>

            {/* Description */}
            <RichTextarea
                name="description"
                label="Description"
                formTools={formTools}
            />
            {/* Sponsor */}
            
        </>
    );
    const contentColumnLeft = (
        <>
            {/* Context */}
            <SelectFetch 
                name="context"
                label="Choisissez un contexte"
                formTools={formTools}
                noValueText={lang.noSelectedOption}
                fetchOption="context-enum"
            />
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
            <Input
                name="contactPoint"
                label="Information de contact"
                tip={{
                    header: "À noter",
                    body: "Cette information vise à offrir une option pour rejoindre un représentant de l'organisation."
                }}
                placeholder="Adresse courriel, numéro de téléphone, etc..."
                formTools={formTools}
            />
            { /* scheduleBudget */}
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
                pattern="^https?:\/\/[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
                placeholder="Une url avec le https, exemple : https://siteWeb.com"
                formTools={formTools}
            />
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
        </>
    );

    return (
        <>
            <SingleBase
                header={header}
                fullWidthContent={fullWidthContent}
                contentColumnLeft={contentColumnLeft}
                contentColumnRight={contentColumnRight}
                footer={footer}
                />
            <Button onClick={submitHandler}>
                Soumettre
            </Button>
        </>
    )
}

export default ProjectSingleEdit;