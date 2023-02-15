import { useState } from 'react'

//Components
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import UpdatePersonForm from '@/DataTypes/Person/Components/Forms/update/UpdatePersonForm';
import { useEffect } from 'react';
import {useHttpClient} from '@/src/hooks/http-hook';

//Styling
import styles from './PersonSingle.module.scss'
import {lang} from "@/common/Data/GlobalConstants";
import SearchTag from '@/src/common/Components/SearchTag';
import Single from "@/DataTypes/common/layouts/single/Single";

const SingleInfoLayout = ({ title, NAMessage, children }) => {

    const defaultNotAvailableMessage = NAMessage ?? (<p>{lang.noInfoAvailable}</p>);

    return (
        <section className={`my-2 ${styles["singleInfoLayout"]}`}>
            <h4>{title}</h4>
            <div className={`px-3 ${styles["singleInfoLayout__main"]}`}>
                {children && children}
                {!children && (defaultNotAvailableMessage)}
            </div>
        </section>
    )
}

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

    const {sendRequest} = useHttpClient();
    
    //State that contains the organisations that the person is part of
    const [memberOfOrganisationList, setMemberOfOrganisationList] = useState([]);


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


    const aside = (
        <>
            <SingleInfoLayout
                title={"Comptétences"}
                NAMessage={<p>Information non disponible</p>}
            >
                <div className={"container"}>
                    <SearchTag
                        className="row"
                        list={occupations &&
                            occupations.map( (entity) => {
                                return { name : entity.occupation.name, _id: entity.occupation._id }
                            })
                        }
                        textField="name"
                        NAMessage="Aucune occupation associée"
                    />
                </div>

            </SingleInfoLayout>
        </>
    );

    const headerMainContent = (
        <div className={`${styles["quick-section"]}`}>
            <h2 className="mb-2">{firstName} {lastName}</h2>
            <p> {nickname} </p>
        </div>
    );

    const ModalComponent = UpdatePersonForm;

    //Remove because this isn't planned in the ontologie yet  :<SingleInfoLayout title={"Intérêts"} />
    return (
        <Single
            className={`${styles["person-view"]}`}
            aside={aside}
            headerMainContent={headerMainContent}
            entity={data}
            ModalForm={ModalComponent}
            showCTA={true}
            cta={"Ceci est une proposition d'appel à l'action. Il reste donc à déterminer s'il est pertinent et quoi mettre à l'intérieur."}
        >
            <SingleInfoLayout title={"Présentation"}>
                <SanitizedInnerHtml>
                    {description}
                </SanitizedInnerHtml>
            </SingleInfoLayout>

            <SingleInfoLayout title={"Projets"} />

            {
                status && status.state &&
                    <SingleInfoLayout
                        title="Statut de l'entité"
                        NAMessage={ status.state === 'accepted' ? "Acceptée" : "En attente d'approbation"}>
                    </SingleInfoLayout>
            }

            {
                status && status.requestedBy &&
                <SingleInfoLayout
                    title={"Créer par"}
                    NAMessage={ <p>{ "Numéro d'identification de l'utilisateur : " + status.requestedBy}</p>}>
                </SingleInfoLayout>
            }
            {
                status && status.lastModifiedBy &&
                <SingleInfoLayout
                    title={"Dernière modifications par"}
                    NAMessage={ <p>{"Numéro d'identification de l'utilisateur : " + status.lastModifiedBy}</p>}>
                </SingleInfoLayout>
            }
        </Single>
    )
}


export default PersonSingle
