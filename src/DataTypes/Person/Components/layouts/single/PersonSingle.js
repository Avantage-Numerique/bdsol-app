import React, {useCallback, useState} from 'react'
import Router, {useRouter} from "next/router";


//Components
import Button from "@/FormElements/Button/Button";
import CreatePersonForm from "@/DataTypes/Person/Components/Forms/CreatePerson/CreatePersonForm";
import SearchTag from '@/src/common/Components/SearchTag';
import Single from "@/DataTypes/common/layouts/single/Single";
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";
import UpdateSkillGroup from '@/src/DataTypes/common/Forms/UpdateSkillGroup/UpdateSkillGroup';

//Styling
import styles from './PersonSingle.module.scss'

//Hooks
import {useModal} from "@/src/hooks/useModal/useModal";

//Utils
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import {SingleEntityStatus} from "@/DataTypes/Status/Components/SingleEntityStatus";
import {lang} from "@/common/Data/GlobalConstants";

const PersonSingle = ({ data, route }) => {

    const { modal, Modal, displayModal, closeModal } = useModal();

    const { 
        _id,
        firstName,
        lastName,
        nickname,
        description,
        occupations,
        domains,
        slug,
        catchphrase,
        createdAt,
        updatedAt,
        status,
        mainImage
    } = data;

    //const {sendRequest} = useHttpClient();
    
    //State that contains the organisations that the person is part of
    //const [memberOfOrganisationList, setMemberOfOrganisationList] = useState([]);

    const imgModalControl = useModal();
/*
    useEffect( () => {
        async function fetchMemberOf() {
            const response = await sendRequest(
                ("/organisations/list"),
                'POST',
                JSON.stringify({ data: { "team.member" : _id }})
            );
            setMemberOfOrganisationList(response.data);
        }
        fetchMemberOf()
    }, []);
*/
    const OccupationGroup = ({occupationName, skillList}) => {

        return (
            <article className={`d-flex flex-column p-2 mb-2 ${styles["occupation-group"]}`}>
                <h5 className="text-dark mb-0">{occupationName}</h5>
                {
                    skillList && skillList.length > 0 &&
                    <ul className="d-flex flex-wrap gap-1 mb-0 mt-2">
                        {
                            skillList.map(skill => (
                            <li 
                                key={skill._id}
                                className={`fs-6 rounded px-1 ${styles["skill-tag"]}`}
                            >{skill.name}</li>
                            ))
                        }
                    </ul>
                }
            </article>
        )
    }

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
        
    }

    const aside = (
        <>
            {/*
                occupations &&
                <SingleInfo
                    title={"Occupations"}
                    NAMessage={<p>Aucune occupation spécifiée</p>}
                >
                    <SearchTag
                        className="row"
                        list={occupations}
                        max="-1"
                        />

                </SingleInfo>
            */}

            { domains && domains.length > 0 &&
                <>
                    <h4>{lang.domainsSingleLabel}</h4>
                    <SearchTag
                        className="row"
                        list={domains}
                        listProperty={"domain"}
                    />
                </>
            }

            <SingleInfo title={"Occupations"}
                NAMessage={<p></p>}
            >    
                {/* Display the different groupes of occupations */}
                { occupations &&
                    occupations.map(occ => (
                        <OccupationGroup 
                            occupationName={occ.occupation} 
                            skillList={occ.skills}
                            key={occ._id}
                        />
                    ))
                }
                <Button size="slim" onClick={() => displayModal()}>Modifier les groupes</Button>
            </SingleInfo>

            <SingleInfo title={"Compétences"}
                NAMessage={<p>Vous n'avez aucune compétence d'entrée pour le moment</p>}
            >
                <SkillsList occupations={occupations}/>
            </SingleInfo>
            
        </>
    );

    const headerMainContent = (
        <div className={`${styles["quick-section"]}`}>
            <h2 className="mb-2">{firstName} {lastName}</h2>
            <p> {catchphrase} </p>
            <p> {nickname} </p>
        </div>
    );

    const singleInfoCommonClass = "border-bottom py-4";

    const ModalComponent = CreatePersonForm;
    const modalComponentParams = {
        uri:"update"
    };


    const getHrefGenerator = useCallback(() => {
        return {
            "[slug]": data?.slug ?? "no-set",
            "[person.slug]": data.slug ?? "no-set",
            "persons": "persons",
        };
    }, []);

    const getLabelGenerator = useCallback((param, query) => {
        return {
            "slug": () => data?.fullName ?? "title must be set",
            "person.slug": () => data.fullName ?? "Personne",
            "persons": () => "Personnes",
        }[param];
    }, []);


    //Remove because this isn't planned in the ontologie yet  :<SingleInfo title={"Intérêts"} />
    return (
        <>
        <Single
            className={`${styles["person-view"]}`}
            aside={aside}
            headerMainContent={headerMainContent}
            entity={data}
            ModalForm={ModalComponent}
            modalParams={modalComponentParams}
            showCTA={true}
            cta={"Ceci est une proposition d'appel à l'action. Il reste donc à déterminer s'il est pertinent et quoi mettre à l'intérieur."}
            modalMainImageControl={imgModalControl}
            route={route}
            breadcrumbParams={{
                labelGenerator: getLabelGenerator,
                hrefGenerator: getHrefGenerator
            }}
        >
            <SingleInfo title={"Présentation"}>
                <SanitizedInnerHtml>
                    {description}
                </SanitizedInnerHtml>
            </SingleInfo>

            <SingleInfo title={"Projets"} />

            {
                status?.state &&
                    <SingleInfo className={singleInfoCommonClass}
                        title="Statut de l'entité">
                        <p>{status.state === 'accepted' ? "Acceptée" : "En attente d'approbation"}</p>
                    </SingleInfo>
            }

            {
                (createdAt || updatedAt || status) &&
                <SingleEntityStatus className={singleInfoCommonClass} createdAt={createdAt} updatedAt={updatedAt} status={status} />
            }
        </Single>

        {
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
        }

        
        </>
    )
}


export default PersonSingle
