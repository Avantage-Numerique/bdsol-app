import React, {useCallback} from 'react'


//Components
import CreatePersonForm from "@/DataTypes/Person/Components/Forms/CreatePerson/CreatePersonForm";
import SearchTag from '@/src/common/Components/SearchTag';
import Single from "@/DataTypes/common/layouts/single/Single";
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";

//Styling
import styles from './ProjectSingle.module.scss'

//Hooks
import {useModal} from "@/src/hooks/useModal/useModal";

//Utils
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import {SingleEntityStatus} from "@/DataTypes/Status/Components/SingleEntityStatus";
import {lang} from "@/common/Data/GlobalConstants";

const ProjectSingle = ({data, route}) => {

    const {
        _id,
        name,
        alternateName,
        slug,
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
        createdAt,
        updatedAt
    } = data;

    const imgModalControl = useModal();


    const aside = (
        <>
            {skills && skills.length > 0 &&
                <>
                    <h4>{lang.domainsSingleLabel}</h4>
                    <SearchTag
                        className="row"
                        list={domains}
                        listProperty={"domain"}
                    />
                </>
            }

        </>
    );

    const headerMainContent = (
        <div className={`${styles["quick-section"]}`}>
            <h2 className="mb-2">{name}</h2>
            {alternateName && <p> {alternateName} </p>}
            {/*entityInCharge && <p><code>{entityInCharge}</code></p>*/}
        </div>
    );

    const singleInfoCommonClass = "border-bottom py-4";

    const ModalComponent = CreatePersonForm;
    const modalComponentParams = {
        uri: "update"
    };


    const getHrefGenerator = useCallback(() => {
        return {
            "[slug]": data?.slug ?? "no-set",
            "[project.slug]": data.slug ?? "no-set",
            "projets": "projects",
        };
    }, []);

    const getLabelGenerator = useCallback((param) => {
        return {
            "slug": () => data?.name ?? "title must be set",
            "project.slug": () => data.name ?? "Projet",
            "projets": () => "Projets",
        }[param];
    }, []);


    //Remove because this isn't planned in the ontologie yet  :<SingleInfo title={"Intérêts"} />
    return (
        <>
            <Single
                className={``}
                aside={aside}
                headerMainContent={headerMainContent}
                entity={data}
                ModalForm={ModalComponent}
                modalParams={modalComponentParams}
                showCTA={true}
                cta={""}
                ctaUrl={url}
                modalMainImageControl={imgModalControl}
                route={route}
                breadcrumbParams={{
                    labelGenerator: getLabelGenerator,
                    hrefGenerator: getHrefGenerator
                }}
            >
                <SingleInfo title={"Présentation"} className={"mb-3"}>
                    <SanitizedInnerHtml>
                        {description}
                    </SanitizedInnerHtml>
                </SingleInfo>

                <SingleInfo title={"Contact"} className={"mb-3"}>
                    <SanitizedInnerHtml>
                        {contactPoint}
                    </SanitizedInnerHtml>
                </SingleInfo>

                <SingleInfo title={"Adresse"} className={"mb-3"}>
                </SingleInfo>

                <SingleInfo title={"Équipe"} className={"mb-3"}>
                </SingleInfo>

                <SingleInfo title={"Financement"} className={"mb-3"}>
                </SingleInfo>

                <SingleInfo title={"Budget"} className={"mb-3"}>
                </SingleInfo>

                {
                    (createdAt || updatedAt || status) &&
                    <SingleEntityStatus className={singleInfoCommonClass} createdAt={createdAt} updatedAt={updatedAt}
                                        status={status}/>
                }
            </Single>

            {/*
            modal.display &&
            <Modal>
                <div className="d-flex mb-3">
                    <h3 className="text-blue4">Éditez vos groupes de compétences</h3>
                    <Button type="button" onClick={closeModal}>Fermer</Button>
                </div>
                
                <UpdateSkillGroup 
                    parentEntity={data}  
                    positiveRequestActions={{
                        callbackFunction: (requestResponse) => {
                            closeModal();
                            Router.push(window.location.href);
                        },
                        displayResMessage: true     //Display a message to the user to confirm the succes
                    }}
                />
            </Modal>
                */}
        </>
    )
}

export default ProjectSingle


/* 

    const SkillsList = ({occupations}) => {

        //Extract every skill objects from the occupations
        const arrayOfSkillObjects = occupations.map(occ => occ.skills);

        //Extract the values of those objects
        const arrayOfSkills = arrayOfSkillObjects ? arrayOfSkillObjects.flat(1) : [];

        //Only keep single instances
        let arrayUniqueBy_id = [...new Map(arrayOfSkills.map(item => [item["_id"], item])).values()];

        //Sort the array before returning the value
        arrayUniqueBy_id.sort((a, b) => {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            // names must be equal
            return 0;
          });

        return (
            <>
                <ul>
                    {
                        arrayUniqueBy_id && arrayUniqueBy_id.map(skill => (
                            <li key={skill._id} className="fs-6">{skill.name}</li>
                        ))
                    }
                </ul>
            </>
        );
    }*/