import React, {useState} from 'react'

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

const PersonSingle = ({ data }) => {

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

    console.log("Data", data)

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
            <article className="d-flex flex-column bg-secondary p-2 rounded mb-2">
                <h5 className="text-blue2">{occupationName}</h5>
                {
                    skillList && skillList.length > 0 &&
                    <ul className="d-flex">
                        {
                            skillList.map(skill => (
                            <li 
                                key={skill._id}
                                className="fs-6 border rounded px-1 bg-white border-white"
                            >{skill.name}</li>
                            ))
                        }
                    </ul>
                }
            </article>
        )
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
                <Button size="slim" onClick={displayModal}>Modifier les groupes</Button>
            </SingleInfo>

            <SingleInfo title={"Compétences"}
                NAMessage={<p>Aucune occupation spécifiée</p>} />
            
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
                
                <UpdateSkillGroup parentEntity={data}  />

            </Modal>
        }

        
        </>
    )
}


export default PersonSingle
