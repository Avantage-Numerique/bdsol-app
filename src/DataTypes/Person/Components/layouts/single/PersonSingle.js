import {useState} from 'react'

//Components
import Button from "@/FormElements/Button/Button"
import UpdatePersonForm from '@/DataTypes/Person/Components/Forms/update/UpdatePersonForm';
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
//import {lang} from "@/common/Data/GlobalConstants";
import {SingleEntityStatus} from "@/DataTypes/Status/Components/SingleEntityStatus";

const PersonSingle = ({ data }) => {

    const { modal, Modal, displayModal, closeModal } = useModal();

    const { 
        _id,
        firstName,
        lastName,
        nickname,
        description,
        occupations,
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

                <SingleInfo
                    title={"Occupations"}
                    NAMessage={<p></p>}
                >
                    <Button size="slim" onClick={displayModal}>Modifier les groupes</Button>
                </SingleInfo>

                

                <SingleInfo
                    title={"Compétences"}
                    NAMessage={<p>Aucune occupation spécifiée</p>}
                >
                    
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

    const ModalComponent = UpdatePersonForm;

    //Remove because this isn't planned in the ontologie yet  :<SingleInfo title={"Intérêts"} />
    return (
        <>
        <Single
            className={`${styles["person-view"]}`}
            aside={aside}
            headerMainContent={headerMainContent}
            entity={data}
            ModalForm={ModalComponent}
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
                
                <UpdateSkillGroup />

            </Modal>
        }

        
        </>
    )
}


export default PersonSingle
