import { useEffect, useState } from 'react'

//Components
import UpdatePersonForm from '@/DataTypes/Person/Components/Forms/update/UpdatePersonForm';
import SearchTag from '@/src/common/Components/SearchTag';
import Single from "@/DataTypes/common/layouts/single/Single";
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";

//Styling
import styles from './PersonSingle.module.scss'

//Hooks
import {useModal} from "@/src/hooks/useModal/useModal";
import {useHttpClient} from '@/src/hooks/http-hook';

//Utils
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import {lang} from "@/common/Data/GlobalConstants";

const PersonSingle = ({ data }) => {

    const { 
        _id,
        firstName,
        lastName,
        nickname,
        description,
        occupations,
        slug,
        createdAt,
        updatedAt,
        status,
        mainImage
    } = data;


    const date_createdAt = new Date(createdAt);
    const date_updatedAt = new Date(updatedAt);

    const {sendRequest} = useHttpClient();
    
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
            {
                occupations &&
                <SingleInfo
                    title={"Occupations"}
                    NAMessage={<p>Aucune occupation spécifié</p>}
                >
                    <SearchTag
                        className="row"
                        list={
                            occupations.map( (entity) => {
                                return {
                                    label : entity.occupation.name,
                                    url: "/"+entity.occupation.category + "/" + entity.occupation.slug
                                }
                            })
                        }
                        />

                </SingleInfo>
            }
        </>
    );

    const headerMainContent = (
        <div className={`${styles["quick-section"]}`}>
            <h2 className="mb-2">{firstName} {lastName}</h2>
            <p> {nickname} </p>
        </div>
    );

    const singleInfoCommonClass = "border-bottom py-4";

    const ModalComponent = UpdatePersonForm;

    //Remove because this isn't planned in the ontologie yet  :<SingleInfo title={"Intérêts"} />
    return (
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
                (date_createdAt || date_updatedAt || status) &&
                <SingleInfo className={singleInfoCommonClass} title={lang.modificationHistory}>
                    <ul className={"list-style-none"}>
                    {
                        date_createdAt &&
                        <li><span>Date de création : </span> {date_createdAt.toLocaleDateString("fr-CA")}</li>
                    }
                    {
                        date_createdAt !== date_updatedAt &&
                        <li><span>Dernière modification : </span> {date_updatedAt.toLocaleDateString("fr-CA")}</li>
                    }
                    {
                        status?.requestedBy &&
                        <li><span>Créer par : </span> {status.requestedBy}</li>
                    }
                    {
                        status?.lastModifiedBy &&
                        <li><span>Dernière modifications par : </span> {status.lastModifiedBy}</li>
                    }

                    </ul>
                </SingleInfo>
            }
        </Single>
    )
}


export default PersonSingle
