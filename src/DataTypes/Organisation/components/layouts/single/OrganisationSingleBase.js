import React from 'react';

//Components
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase"
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import SearchTag from '@/src/common/Components/SearchTag';
import Button from "@/FormElements/Button/Button";

//Custom hooks
import {useModal} from "@/src/hooks/useModal/useModal";

//Styling 

//Utils
import {lang} from "@/common/Data/GlobalConstants";
import AppRoutes from "@/src/Routing/AppRoutes";
import DateWidget from "@/common/widgets/DateWidget/DateWidget";
import Icon from "@/common/widgets/Icon/Icon";

import Single from "@/DataTypes/common/layouts/single/Single";
import CreateOrganisationForm from "@/DataTypes/Organisation/components/forms/CreateOrganisationForm/CreateOrganisationForm";
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";
import {SingleEntityStatus} from "@/DataTypes/Status/Components/SingleEntityStatus";
import UpdateOffers from '@/src/DataTypes/Organisation/components/forms/UpdateOffers/UpdateOffers';
import UpdateTeams from '@/src/DataTypes/Organisation/components/forms/UpdateTeams/UpdateTeams';




const OrganisationSingleBase = ({ data }) => {

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

    /****************************
     *  Sections
     ***************************/
    const FullWidthContent = () => (
        <SingleInfo title={"Présentation"} className={"mb-3"}>
            <SanitizedInnerHtml>
                {description}
            </SanitizedInnerHtml>
        </SingleInfo>
    )

    const ContentColumnLeft = () => (
        <>
            <SingleInfo title={"Équipe"} className={"mb-3"}>
                <section className={"border-bottom"}>
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="h5 my-3">{lang.teamMembers}</h4>
                        <button className="rounded bg-purplelight py-1 px-2" onClick={teamsModal.displayModal}>
                            <Icon iconName="ar la-edit" />
                        </button>
                    </div>
                    {/* Rows of members */}
                    { team?.length > 0 ?
                        <ul className="d-flex flex-wrap gap-2">
                            {
                                team.map(elem => (
                                    <li key={elem.member._id} className="bg-light w-100 px-2 py-1 rounded-1 small mb-1">
                                        <div className="text-dark"><strong>{elem.member.firstName} {elem.member.lastName}</strong></div>
                                        <div>{elem.role}</div>
                                    </li>
                                ))
                            }
                        </ul>
                        :
                        <p className="small">{lang.noTeamMemberSetMessage}</p>
                    }
                </section>
            </SingleInfo>

            <SingleInfo title={"Financement"} className={"mb-3"}>
            </SingleInfo>

            <SingleInfo title={"Budget"} className={"mb-3"}>
            </SingleInfo>
        </>
    )

    const ContentColumnRight = () => (
        <> 
            {/*************** Offers *****************/}
            <section className="mt-4">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="h5 my-3">Services offerts</h4>
                    <button className="rounded bg-purplelight py-1 px-2" onClick={offersModal.displayModal}>
                        <Icon iconName="ar la-edit" />
                    </button>
                </div>
                    
                { offers?.length > 0 && offers.map(offer => (
                    <article className={`d-flex flex-column p-2 mb-2 skill-group bg-light`}>
                        <h5 className="text-dark mb-1 group-name">{offer.offer}</h5>
                            <SearchTag
                                className="row"
                                list={offer.skills}
                            />
                    </article>
                ))}
                { (!offers || offers?.length === 0) &&
                    <p>Ajoutez une offre de services à votre organisation.</p>
                }
            </section>
            {/*********** Domains ***********/}
            <SingleInfo title={lang.domainsSingleLabel} className={"mb-3"}>
                <SearchTag
                    className="row"
                    list={domains}
                    listProperty={"domain"}
                />
            </SingleInfo>
            {/*********** Contact ***********/}
            <SingleInfo title={"Contact"} className={"mb-3"}>
                {contactPoint && contactPoint}
            </SingleInfo>
        </>
    )

    const Footer = () => (
        <>
            {
                (createdAt || updatedAt || status) &&
                <SingleEntityStatus 
                    className={singleInfoCommonClass} 
                    createdAt={createdAt} 
                    updatedAt={updatedAt}         
                    status={status}
                />
            }
        </>
    )

    {/**************************
    *   Elements returned as props of the SingleBase
    */}
    return (
        <>
            <SingleBase 
                header={null}
                fullWidthContent={FullWidthContent}
                contentColumnLeft={ContentColumnLeft}
                contentColumnRight={ContentColumnRight}
                footer={Footer}
            />
        </>
    )
}

export default OrganisationSingleBase