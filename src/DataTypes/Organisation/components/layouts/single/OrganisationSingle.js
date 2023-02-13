import React from 'react' 

//Components
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';

//Styling 
import styles from './OrganisationSimple.module.scss';
import Single from "@/DataTypes/common/layouts/single/Single";
import CreateOrganisationForm from "@/DataTypes/Organisation/components/forms/CreateOrganisationForm/CreateOrganisationForm";


const OrganisationSimple = ({ data }) => {

    const defaultOrgAvatar = '/general_images/Jurassic_Park_Main_Gate.jpg';

    //Destructuring of data's prop
    const {
        //contactPoint,
        createdAt,
        description,
        fondationDate,
        name,
        offers,
        //slug,
        //status,
        team,
        updatedAt,
        url,
        //__v,
        //_id
    } = data;

    const date_createdAt = new Date(createdAt);
    const date_updatedAt = new Date(updatedAt);
    const date_fondationDate = new Date(fondationDate);

    const ModalComponent = CreateOrganisationForm;
    const modalComponentParams = {
        uri:"update"
    };

    const headerMainContent = (
        <div className={`${styles["quick-section"]}`}>
            <h2 className="mb-2">{name}</h2>
            <p className="small w-100 my-0"><span>Date de fondation : </span> {date_fondationDate.toLocaleDateString("fr-CA")}</p>
        </div>
    );

    const aside = (
        <>
            <section className={"border-bottom"}>
                <h4 className="h5 my-3">Membres de l'équipe</h4>
                { team && team.length > 0 &&
                    <ul className="d-flex flex-wrap gap-2">
                        {
                            team &&
                            team.map(elem => (
                                <li key={elem.member._id} className="border p-1 rounded-1 small">
                                    {elem.member.firstName} {elem.member.lastName}
                                </li>
                            ))
                        }
                    </ul>
                }
                {
                    (!team || team.length === 0) &&
                    <p className="small">Personne n'est inscrit comme membre de l'équipe de cette organisation.</p>
                }
            </section>
            {/******** Display of the offer's list **********/}
            <section className="mt-4">
                <h4 className="h5 my-3">Services offerts</h4>
                { offers && offers.length > 0 &&
                    <ul className="d-flex flex-wrap gap-2">
                        {
                            offers &&
                            offers.map(elem => (
                                <li
                                    key={elem.offer._id}
                                    className="border p-1 rounded-1 small"
                                >{elem.offer.name}</li>
                            ))
                        }
                    </ul>
                }
                {
                    !offers &&
                    <p className="small">Aucun service n'est proposé pour cette organisation.</p>
                }
            </section>
        </>
    );

    return (
        <Single
            className={`single ${styles["organisation-view"]}`}
            aside={aside}
            headerMainContent={headerMainContent}
            entity={data}
            ModalForm={ModalComponent}
            modalParams={modalComponentParams}
            showCTA={true}
            cta={"Visiter la page de la ressource"}
            ctaUrl={url}
            defaultMainImage={defaultOrgAvatar}
        >
            {/******** Description section **********/}
            {
                description &&
                <section className="border-bottom my-4">
                    <SanitizedInnerHtml>
                        {description}
                    </SanitizedInnerHtml>
                </section>
            }
            {/******** Description section **********/}
            {
                date_createdAt &&
                <section className="border-bottom my-4">
                    <p className="small w-100 my-0"><span>Date de création : </span> {date_createdAt.toLocaleDateString("fr-CA")}</p>
                    {
                        createdAt !== updatedAt &&
                        <p className="small w-100"><span>Dernière modification : </span> {date_updatedAt.toLocaleDateString("fr-CA")}</p>
                    }
                </section>
            }
        </Single>
    )
}

export default OrganisationSimple