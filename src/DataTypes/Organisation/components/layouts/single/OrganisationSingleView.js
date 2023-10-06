import React, {useCallback} from 'react';

//components
import SingleBaseHeader from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader"
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase"
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import SearchTag from '@/src/common/Components/SearchTag';

//Utils
import Organisation from '@/src/DataTypes/Organisation/models/Organisation';
import {lang} from "@/common/Data/GlobalConstants";
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";
import {SingleEntityMeta} from "@/src/DataTypes/Meta/components/SingleEntityMeta";
import EntitiesTagGrid from "@/DataTypes/Entity/layouts/EntitiesTagGrid";
import {ExternalLink} from "@/common/Components/ExternalLink";
import {dateManager, FULL_HUMAN_DATE_FORMAT} from "@/common/DateManager/DateManager";
import {SkillGroup} from "@/DataTypes/common/layouts/skillsGroup/SkillGroup";


const OrganisationSingleView = ({ data }) => {

    //Destructuring of data's prop // We should use model here.
    const {
        //contactPoint,
        createdAt,
        description,
        contactPoint,
        fondationDate,
        catchphrase,
        mainImage,
        name,
        offers,
        domains,
        //slug,
        team,
        updatedAt,
        url,
        location,
        meta,
        projects,
        events,
        //__v,
        //_id
    } = data;

    const model = new Organisation(data);
    console.log("OrganisationSingleView", model);
    /******* Sorted lists ********/
    const sortedOffers = offers?.[0]?.subMeta?.order ? offers.sort((a,b) => a.subMeta.order - b.subMeta.order) : offers;
    const sortedTeam = team?.[0]?.subMeta?.order ? team.sort((a,b) => a.subMeta.order - b.subMeta.order) : team;

    /* Needed for breadCrumb generator */
    const getLabelGenerator = useCallback((param, query) => {
        return {
            "organisations": lang.Organisations,
            "slug": name        
        }[param];
    }, []);

    /****************************
     *  Sections
     ***************************/
    const breadCrumb = {
        route: model.singleRoute,
        getLabelGenerator: getLabelGenerator
    }

    const Header = (
        <SingleBaseHeader
            className={"mode-public"}
            title={(<SanitizedInnerHtml tag={"h1"} className="text-white">{`${model.title}`}</SanitizedInnerHtml>)}
            subtitle={(
                <div className="d-text">
                    <h4 className="text-white">{catchphrase}</h4>
                </div>
            )}
            mainImage={model.mainImage}
            entity={model}
            buttonText="Proposer des modifications"
            buttonLink={model.singleEditLink}
        />
    )

    const FullWidthContent = (
        <>
            {description !== "" &&
                <SingleInfo title={"Présentation"} className={"mb-3 mt-4"}>
                    <SanitizedInnerHtml>
                        {description}
                    </SanitizedInnerHtml>
                </SingleInfo>
            }
        </>
    )
    const { TimeTag } = dateManager(fondationDate);
    const ContentColumnLeft = (
        <>
            { offers.length > 0 &&
                <SingleInfo
                    title="Services offerts"
                    NAMessage="Aucun service n'est inscrit pour cette organisation."
                    className="mb-4"
                    classNameH4="my-3"
                >
                    { sortedOffers?.length > 0 && sortedOffers.map(offer => (
                        <SkillGroup
                            label={offer.groupName}
                            skills={offer.skills}
                            key={offer.groupName}
                        />
                    ))}
                </SingleInfo>
            }
            {sortedTeam.length > 0 &&
                <SingleInfo title={lang.teamMembers} className={"mb-3"}>
                    <EntitiesTagGrid feed={sortedTeam} subEntityProperty={"member"} subBadgeProperty={"role"} noneMessage={lang.noTeamMemberSetMessage} />
                </SingleInfo>
            }
            { fondationDate &&
                <SingleInfo
                    title={lang.fondationDate}
                    className={"mb-3"}>
                    <TimeTag date={fondationDate} format={FULL_HUMAN_DATE_FORMAT} />
                </SingleInfo>
            }
            {projects.length > 0 &&
                <SingleInfo title={`${lang.plural(lang.inChargeOfProject, lang.inChargeOfProjects, projects.length)}`} className={"mb-3"}>
                    <EntitiesTagGrid feed={projects} />
                </SingleInfo>
            }
            {events.length > 0 &&
                <SingleInfo title={`${lang.plural(lang.organizerOfEvent, lang.organizerOfEvents, events.length)}`} className={"mb-3"}>
                    <EntitiesTagGrid feed={events} />
                </SingleInfo>
            }
            { url &&
                <SingleInfo title={lang.hyperlink} className={"mb-3"}>
                    <p>
                        <ExternalLink href={url} title={`${model.title}`}>
                            {url}
                        </ExternalLink>
                    </p>
                </SingleInfo>
            }
        </>
    )

    const ContentColumnRight = (
        <>
            {
                location?.length > 0 &&
                <SingleInfo title="Emplacement">
                    <EntitiesTagGrid feed={location} subBadgeProperty={"address"} columnClass={"col-12"} />
                </SingleInfo>
            }
            { contactPoint &&
                <SingleInfo title={"Contact"} className={"mb-3"}>
                    {contactPoint}
                </SingleInfo>
            }
            { domains.length > 0 &&
                <SingleInfo
                    title={lang.domainsSingleLabel}
                    className={"mb-3"}
                    NAMessage="Aucun domaine d'activité n'est précisé pour le moment." >
                    {domains &&
                        <SearchTag
                            className="row"
                            list={domains}
                            listProperty={"domain"}
                        />
                    }
                </SingleInfo>
            }
        </>
    )

    const Footer = (
        <>
            {
                (createdAt || updatedAt || meta) &&
                <SingleEntityMeta  
                    createdAt={createdAt} 
                    updatedAt={updatedAt} 
                    meta={meta} />
            }
        </>
    )

    {/**************************
    *   Elements returned as props of the SingleBase
    */}
    return (
        <>
            <SingleBase 
                breadCrumb={breadCrumb}
                header={Header}
                fullWidthContent={FullWidthContent}
                contentColumnLeft={ContentColumnLeft}
                contentColumnRight={ContentColumnRight}
                footer={Footer}
                model={model}
            />
        </>
    )
}

export default OrganisationSingleView