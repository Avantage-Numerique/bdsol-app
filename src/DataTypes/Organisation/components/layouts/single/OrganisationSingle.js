import React from 'react' 
import Router from "next/router";


//Components
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import SearchTag from '@/src/common/Components/SearchTag';
import Button from "@/FormElements/Button/Button";


//Styling 
import styles from './OrganisationSimple.module.scss';



import Single from "@/DataTypes/common/layouts/single/Single";
import CreateOrganisationForm from "@/DataTypes/Organisation/components/forms/CreateOrganisationForm/CreateOrganisationForm";
import {lang} from "@/common/Data/GlobalConstants";
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";
import {useModal} from "@/src/hooks/useModal/useModal";
import {SingleEntityStatus} from "@/DataTypes/Status/Components/SingleEntityStatus";
import DateWidget from "@/common/widgets/DateWidget/DateWidget";
import AppRoutes from "@/src/Routing/AppRoutes";
import UpdateOffers from '@/src/DataTypes/Organisation/components/forms/UpdateOffers/UpdateOffers';
import UpdateTeams from '@/src/DataTypes/Organisation/components/forms/UpdateTeams/UpdateTeams';


const OrganisationSingle = ({ data }) => {

    const defaultOrgAvatar = '/general_images/organisation-default.jpg';

    /**********
     * 
     *  Modals declarations 
     * 
     *  EX : { modal, Modal, displayModal, closeModal } = useModal();
     * 
     */ 
    const ModalComponent = CreateOrganisationForm;
    const modalComponentParams = {
        uri:"update"
    };
    const imgModalControl = useModal();
    const offersModal = useModal();
    const teamsModal = useModal();


    //Destructuring of data's prop
    const {
        //contactPoint,
        createdAt,
        description,
        contactPoint,
        fondationDate,
        catchphrase,
        name,
        offers,
        domains,
        //slug,
        //status,
        team,
        updatedAt,
        url,
        status,
        //__v,
        //_id
    } = data;


    const headerMainContent = (
        <div className={`${styles["quick-section"]}`}>
            <h2 className="mb-2">{name}</h2>
            <p className="small w-100 my-0">
                { catchphrase && <><span>{catchphrase}</span><br/></>}
                { fondationDate && <span>{lang.fondationDate+lang.colon} </span>} <DateWidget stringDate={fondationDate} />
            </p>
        </div>
    );

    const aside = (
        <>
            {
                domains && domains.length > 0 &&
                <>
                    <h4>{lang.domainsSingleLabel}</h4>
                    <SearchTag
                        className="row"
                        list={domains}
                        listProperty={"domain"}
                    />
                </>
            }
            {
                contactPoint &&
                <section className={"border-bottom"}>
                    <h4 className="h5">{lang.bestContactPointLabel}</h4>
                    <SanitizedInnerHtml tag={"p"}>{contactPoint}</SanitizedInnerHtml>
                </section>
            }
            <section className={"border-bottom"}>
                <h4 className="h5 my-3">{lang.teamMembers}</h4>
                { team?.length > 0 ?
                    <ul className="d-flex flex-wrap gap-2">
                        {
                            team.map(elem => (
                                <li key={elem.member._id} className="border p-1 rounded-1 small">
                                    {elem.member.firstName} {elem.member.lastName}
                                </li>
                            ))
                        }
                    </ul>
                    :
                    <p className="small">{lang.noTeamMemberSetMessage}</p>
                }
            </section>

            {/******** Display of the offer's list **********/}
            <section className="mt-4">
                <h4 className="h5 my-3">Services offerts</h4>
                    
                { offers?.length > 0 && offers.map(offer => (
                    <article className={`d-flex flex-column p-2 mb-2 skill-group`}>
                        <h5 className="text-dark mb-0 group-name">{offer.offer}</h5>
                            <SearchTag
                                className="row"
                                list={offer.skills}
                            />
                    </article>
                ))}
                { (!offers || offers?.length === 0) &&
                    <p>Ajoutez une offre de services à votre organisation.</p>
                }
                <Button size="slim" onClick={() => offersModal.displayModal()}>Modifier les groupes</Button>
            </section>
            
        </>
    );

    const singleInfoCommonClass = "border-bottom py-4";

    return (
        <>
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
            modalMainImageControl={imgModalControl}
            route={AppRoutes.organisationSingle}
            breadcrumbParams={{
                    title: `${name}`
                }}
        >

            {
                description &&
                <SingleInfo className={singleInfoCommonClass} title={lang.singleDescriptionLabel}>
                    <SanitizedInnerHtml>
                        {description}
                    </SanitizedInnerHtml>
                </SingleInfo>
            }

            {/* Team display */}
            <SingleInfo title={"Équipe"}> 
                { team && team.length > 0 &&
                    team.map(() => (
                        <ul>
                            <li>Team</li>
                        </ul>
                    ))
                }
                { !team &&
                    <p>Vous pouvez ajouter des équipes à votre organisation.</p>
                }
                <Button onClick={teamsModal.displayModal}>Ajouter des membres à l'équipe</Button>
            </SingleInfo>


            {
                (createdAt || updatedAt || status) &&
                <SingleEntityStatus className={singleInfoCommonClass} createdAt={createdAt} updatedAt={updatedAt} status={status} />
            }
        </Single>

        {
            offersModal.modal.display &&
            <offersModal.Modal>
                <div className="d-flex mb-3">
                    <h3 className="text-blue4">Éditez vos groupes de compétences</h3>
                    <Button type="button" onClick={offersModal.closeModal}>Fermer</Button>
                </div>
                
                <UpdateOffers 
                    parentEntity={data}  
                    positiveRequestActions={{
                        callbackFunction: (requestResponse) => {
                            offersModal.closeModal();
                            Router.push(window.location.href);
                        },
                        displayResMessage: true     //Display a message to the user to confirm the succes
                    }}
                />
            </offersModal.Modal>
        }

        {
            teamsModal.modal.display &&
            <teamsModal.Modal>
                <div className="d-flex mb-3">
                    <h3 className="text-blue4">Éditez les membres de votre équipe</h3>
                    <Button type="button" onClick={teamsModal.closeModal}>Fermer</Button>
                </div>
                
                <UpdateTeams 
                    parentEntity={data}  
                    positiveRequestActions={{
                        callbackFunction: (requestResponse) => {
                            teamsModal.closeModal();
                            Router.push(window.location.href);
                        },
                        displayResMessage: true     //Display a message to the user to confirm the succes
                    }}
                />
            </teamsModal.Modal>
        }
        </>
    )
}

export default OrganisationSingle