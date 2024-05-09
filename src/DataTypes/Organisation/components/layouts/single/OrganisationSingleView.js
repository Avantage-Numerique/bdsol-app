import React, {useEffect, useState} from 'react';
import Link from "next/link";

//components
import SingleBaseHeader from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader"
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase"
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import SearchTag from '@/src/common/Components/SearchTag';
import SingleBaseProgressBar
    from '@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseProgressBar/SingleBaseProgressBar'


//Utils
import Organisation from '@/src/DataTypes/Organisation/models/Organisation';
import Equipment from '@/src/DataTypes/Equipment/models/Equipment';
import {lang} from "@/common/Data/GlobalConstants";
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";
import {SingleEntityMeta} from "@/src/DataTypes/Meta/components/SingleEntityMeta";
import EntitiesTagGrid from "@/DataTypes/Entity/layouts/EntitiesTagGrid";
import {dateManager} from "@/common/DateManager/DateManager";
import {SkillGroup} from "@/DataTypes/common/layouts/skillsGroup/SkillGroup";
import {removeTagsFromString} from '@/src/helpers/html'

//Styles
import styles from './OrganisationSingleView.module.scss';
import SocialHandleDisplay from '@/src/DataTypes/common/layouts/SocialHandlesViews/SocialHandleDisplay';

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

    /******* Sorted lists ********/
    const sortedOffers = offers?.[0]?.subMeta?.order ? offers.sort((a,b) => a.subMeta.order - b.subMeta.order) : offers;
    const sortedTeam = team?.[0]?.subMeta?.order ? team.sort((a,b) => a.subMeta.order - b.subMeta.order) : team;

    const orgLabels = {
        "organisations": lang.Organisations,
        "slug": name
    };

    const [breadCrumb, setBreadCrumb] = useState({
        route: model.singleRoute,
        labels: orgLabels,
    });

    useEffect(() => {
        setBreadCrumb({
            route: model.singleRoute,
            labels: orgLabels,
        })
    }, [name]);


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
        <SingleInfo 
            title={lang.about} 
            NAMessage="Aucune description n'est disponible pour le moment."
        >
            {
                removeTagsFromString(description) && 
                <SanitizedInnerHtml>
                    {description}
                </SanitizedInnerHtml>
            }
        </SingleInfo>
    )
    const { TimeTag } = dateManager(fondationDate);
    const ContentColumnLeft = (
        <>
            {/* Offers */}
            <SingleInfo
                title={lang.skillsAndTechnologies}
                NAMessage="Aucun service n'est inscrit pour cette organisation."
                cardLayout
            >
                { sortedOffers?.length > 0 && sortedOffers.map(offer => (
                    <SkillGroup
                        label={offer.groupName}
                        skills={offer.skills}
                        key={offer.groupName}
                    />
                ))}
            </SingleInfo>
            
            {/* Team */}
            <SingleInfo 
                title={lang.teamMembers}
                displayCondition={sortedTeam.length > 0}
                cardLayout
            >
                <EntitiesTagGrid 
                    feed={sortedTeam} 
                    subEntityProperty={"member"} 
                    subBadgeProperty={"role"} 
                    noneMessage={lang.noTeamMemberSetMessage} 
                />
            </SingleInfo>
            
            {/* Projects */}
            <SingleInfo 
                title={`${lang.plural(lang.Project, lang.Projects, projects.length)}`} 
                displayCondition={projects.length > 0}
                cardLayout
            >
                <EntitiesTagGrid feed={projects} />
            </SingleInfo>
            
            {/* Events */}
            <SingleInfo 
                title={`${lang.plural(lang.organizerOfEvent, lang.organizerOfEvents, events.length)}`}
                displayCondition={events.length > 0}
                cardLayout
            >
                <EntitiesTagGrid feed={events} />
            </SingleInfo>
            
            {/* Equipment */}
            <SingleInfo 
                title={lang.EquipmentsOwned}
                displayCondition={equipment && equipment.length > 0}
                cardLayout
            >
                <ul className={`container mt-2 mb-0 ${styles["equipment-container"]}`}>
                    <li className="row mb-2">
                        <div className="d-flex">
                            <div className={`text-secondary-darker ${styles["equipment-row__qty"]}`}>{lang.Qty}</div>
                            <div className={`col text-secondary-darker`}>{lang.label}</div>
                            <div className="col text-secondary-darker">{lang.modelName}</div>
                            <div className="col text-secondary-darker">{lang.brand}</div>
                        </div>
                    </li>
                    {equipment && equipment.map((equip, index) => {
                        const equipmentModel = new Equipment(equip.equipment);
                        return (
                            <li className={` ${styles["equipment-row"]} row rounded py-2 mt-2`} key={`orgEquip${index}`}>
                                <Link href={equipmentModel.singleLink} title={equipmentModel.name}>
                                    <div className="d-flex">
                                        <div className={`${styles["equipment-row__qty"]} text-center`}>{equip.qty}</div>
                                        <div className={`col ${styles["equipment-row__name"]}`}>{equipmentModel.label}</div>
                                        <div className="col">{equipmentModel.modelName}</div>
                                        <div className="col">{equipmentModel.brand}</div>
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </SingleInfo>
            
        </>
    )

    const ContentColumnRight = (
        <>
            {location &&
                <SingleInfo
                    displayCondition={location?.length > 0}
                    title={lang.plural(lang.organisationPlace, lang.organisationPlaces, location?.length)}
                    cardLayout
                >
                    <EntitiesTagGrid feed={location} subBadgeProperty={"address"} columnClass={"col-12"} />
                </SingleInfo>
            }
            
            {/* Contact information */}
            <SingleInfo 
                title={lang.organisationContact} 
                cardLayout
            >
                {contactPoint}
            </SingleInfo>
            
            {/* Domains */}
            <SingleInfo
                title={lang.Domains}
                NAMessage="Aucun secteur d'activité n'est précisé pour le moment." 
                displayCondition={domains.length > 0}
                cardLayout
            >
                {domains &&
                    <SearchTag
                        list={domains}
                        listProperty={"domain"}
                    />
                }
            </SingleInfo>
            
            {/* Fondation date */}
            <SingleInfo
                title={lang.fondationDate}
                displayCondition={fondationDate ? true : false}
                cardLayout
            >
                <TimeTag date={fondationDate} format={lang.fullHumanDateFormat} />
            </SingleInfo>

            {/* Url */}
            { model && model?.url &&
                <SocialHandleDisplay
                    title={lang.externalLinks}
                    url={model?.url}
                />
            }
        </>
    )

    const Footer = (
        <>
            {
                (createdAt || updatedAt || meta) &&
                <SingleInfo 
                    title={lang.entityMetadata} 
                    className="border-top pt-3"
                >
                    {/*********** Entity data ***********/}
                    <SingleEntityMeta createdAt={createdAt} updatedAt={updatedAt} meta={meta} />
                </SingleInfo>
            }
        </>
    )

    const SinglePageBottom = (
        <>
            <SingleBaseProgressBar 
                dataList={[
                    {data: name},
                    {data: catchphrase},
                    {data: description, validationFunction: (value => removeTagsFromString(value) ? true : false)},
                    {data: sortedOffers},
                    {data: sortedTeam},
                    {data: location},
                    {data: contactPoint},
                    {data: equipment},
                    {data: domains},
                    {data: fondationDate},
                    {data: url},
                    {data: model.mainImage.isDefault, validationFunction: ((value) => !value)},
                ]}
                buttonText={lang.contributeButtonLabel}
                buttonLink={model.singleEditLink}
            />
        </>
    )

    return (
        <>
            <SingleBase 
                breadCrumb={breadCrumb}
                header={Header}
                fullWidthContent={FullWidthContent}
                contentColumnLeft={ContentColumnLeft}
                contentColumnRight={ContentColumnRight}
                footer={Footer}
                singlePageBottom={SinglePageBottom}
                model={model}
            />
        </>
    )
}

export default OrganisationSingleView