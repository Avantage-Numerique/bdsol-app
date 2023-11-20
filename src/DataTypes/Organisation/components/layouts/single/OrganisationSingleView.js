import React, {useCallback} from 'react';
import Link from "next/link";

//components
import SingleBaseHeader from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader"
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase"
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import SearchTag from '@/src/common/Components/SearchTag';

//Utils
import Organisation from '@/src/DataTypes/Organisation/models/Organisation';
import Equipment from '@/src/DataTypes/Equipment/models/Equipment';
import {lang} from "@/common/Data/GlobalConstants";
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";
import {SingleEntityMeta} from "@/src/DataTypes/Meta/components/SingleEntityMeta";
import EntitiesTagGrid from "@/DataTypes/Entity/layouts/EntitiesTagGrid";
import {ExternalLink} from "@/common/Components/ExternalLink";
import {dateManager} from "@/common/DateManager/DateManager";
import {SkillGroup} from "@/DataTypes/common/layouts/skillsGroup/SkillGroup";
import {appConfig} from "@/src/configs/AppConfig";

//Styles
import styles from './OrganisationSingleView.module.scss';

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
        equipment,
        //__v,
        //_id
    } = data;

    const model = new Organisation(data);

    const sectionClassSpacing = appConfig.spacing.singleSectionSpacingClass;

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
            title={(<h1>{`${model.title}`}</h1>)}
            subtitle={(
                <div className="d-text">
                    <h4>{catchphrase}</h4>
                </div>
            )}
            mainImage={model.mainImage}
            entity={model}
            buttonText={lang.contributeButtonLabel}
            buttonLink={model.singleEditLink}
        />
    )

    const FullWidthContent = (
        <>
            {description !== "" &&
                <SingleInfo title={lang.organisationDescription} className={"mb-3 mt-4"}>
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
                    title={lang.organisationSkills}
                    NAMessage="Aucun service n'est inscrit pour cette organisation."
                    className={`${sectionClassSpacing}`}
                    classNameTitle="my-3"
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
                <SingleInfo title={lang.teamMembers} className={`${sectionClassSpacing}`}>
                    <EntitiesTagGrid feed={sortedTeam} subEntityProperty={"member"} subBadgeProperty={"role"} noneMessage={lang.noTeamMemberSetMessage} />
                </SingleInfo>
            }

            {projects.length > 0 &&
                <SingleInfo title={`${lang.plural(lang.inChargeOfProject, lang.inChargeOfProjects, projects.length)}`} className={`${sectionClassSpacing}`}>
                    <EntitiesTagGrid feed={projects} />
                </SingleInfo>
            }
            {events.length > 0 &&
                <SingleInfo title={`${lang.plural(lang.organizerOfEvent, lang.organizerOfEvents, events.length)}`} className={`${sectionClassSpacing}`}>
                    <EntitiesTagGrid feed={events} />
                </SingleInfo>
            }
            {
                equipment &&
                <SingleInfo title={lang.Equipments} className={`${sectionClassSpacing}`}>
                    <ul className={`container mt-2 ${styles["equipment-container"]}`}>
                            <li className="row">
                                <div className="d-flex">
                                    <div className={`text-secondary ${styles["equipment-row__qty"]}`}>{lang.Qty}</div>
                                    <div className={`col text-secondary`}>{lang.label}</div>
                                    <div className="col text-secondary">{lang.modelName}</div>
                                    <div className="col text-secondary">{lang.brand}</div>
                                </div>
                            </li>
                        {
                            equipment.map((equip, index) => {
                                const equipmentModel = new Equipment(equip.equipment);
                                return (
                                    <li className={` ${styles["equipment-row"]} row border-top py-2`} key={`orgEquip${index}`}>
                                        <Link href={equipmentModel.singleLink} title={equipmentModel.name}>
                                            <div className="d-flex">
                                                <div className={`${styles["equipment-row__qty"]}`}>{equip.qty}</div>
                                                <div className={`col ${styles["equipment-row__name"]}`}>{equipmentModel.label}</div>
                                                <div className="col">{equipmentModel.modelName}</div>
                                                <div className="col">{equipmentModel.brand}</div>
                                            </div>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </SingleInfo>
            }
        </>
    )

    const ContentColumnRight = (
        <>
            {
                location?.length > 0 &&
                <SingleInfo title={lang.plural(lang.organisationPlace, lang.organisationPlaces, location.length)} className={`${sectionClassSpacing}`}>
                    <EntitiesTagGrid feed={location} subBadgeProperty={"address"} columnClass={"col-12"} />
                </SingleInfo>
            }
            { contactPoint &&
                <SingleInfo title={lang.organisationContact} className={`${sectionClassSpacing}`}>
                    {contactPoint}
                </SingleInfo>
            }
            { domains.length > 0 &&
                <SingleInfo
                    title={lang.domainsSingleLabel}
                    className={`${sectionClassSpacing}`}
                    NAMessage="Aucun domaine d'activité n'est précisé pour le moment." >
                    {domains &&
                        <SearchTag
                            list={domains}
                            listProperty={"domain"}
                        />
                    }
                </SingleInfo>
            }
            { fondationDate &&
                <SingleInfo
                    title={lang.fondationDate}
                    className={`${sectionClassSpacing}`}>
                    <TimeTag date={fondationDate} format={lang.fullHumanDateFormat} />
                </SingleInfo>
            }
            { url &&
                <SingleInfo title={lang.hyperlink} className={`${sectionClassSpacing}`}>
                    <p>
                        <ExternalLink href={url} title={`${model.title}`}>
                            {url}
                        </ExternalLink>
                    </p>
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