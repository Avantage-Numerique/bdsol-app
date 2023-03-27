import React from 'react' 

//Components
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import SearchTag from '@/src/common/Components/SearchTag';

//Styling 
import styles from './OrganisationSimple.module.scss';
import Single from "@/DataTypes/common/layouts/single/Single";
import CreateOrganisationForm from "@/DataTypes/Organisation/components/forms/CreateOrganisationForm/CreateOrganisationForm";
import {lang} from "@/common/Data/GlobalConstants";
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";
import {useModal} from "@/src/hooks/useModal/useModal";
import {SingleEntityStatus} from "@/DataTypes/Status/Components/SingleEntityStatus";
import DateWidget from "@/common/widgets/DateWidget/DateWidget";


const OrganisationSingle = ({ data }) => {

    const defaultOrgAvatar = '/general_images/Jurassic_Park_Main_Gate.jpg';

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

    const ModalComponent = CreateOrganisationForm;
    const modalComponentParams = {
        uri:"update"
    };

    const imgModalControl = useModal();

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
            { offers?.length > 0 &&
                <section className="mt-4">
                    <h4 className="h5 my-3">Services offerts</h4>
                        <SearchTag
                        className="row"
                        list={offers}
                        />
                </section>
            }
        </>
    );

    const singleInfoCommonClass = "border-bottom py-4";

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
            modalMainImageControl={imgModalControl}
        >
            {
                description &&
                <SingleInfo className={singleInfoCommonClass} title={lang.singleDescriptionLabel}>
                    <SanitizedInnerHtml>
                        {description}
                    </SanitizedInnerHtml>
                </SingleInfo>
            }
            {
                (createdAt || updatedAt || status) &&
                <SingleEntityStatus className={singleInfoCommonClass} createdAt={createdAt} updatedAt={updatedAt} status={status} />
            }
        </Single>
    )
}

export default OrganisationSingle