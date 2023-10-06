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
import {dateManager, FULL_HUMAN_DATE_FORMAT} from "@/common/DateManager/DateManager";

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
        equipment,
        //__v,
        //_id
    } = data;
console.log("data", data)
    const model = new Organisation(data);

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
                    { offers?.length > 0 && offers.map(offer => (
                        <article key={offer.groupName} className={`d-flex flex-column p-2 mb-2 skill-group bg-light`}>
                            <h5 className="text-dark mb-1 group-name">{offer.groupName}</h5>
                                <SearchTag
                                    className="row"
                                    list={offer.skills}
                                />
                        </article>
                    ))}
                </SingleInfo>
            }
            {team.length > 0 &&
                <SingleInfo title={lang.teamMembers} className={"mb-3"}>
                    <EntitiesTagGrid feed={team} subEntityProperty={"member"} subBadgeProperty={"role"} noneMessage={lang.noTeamMemberSetMessage} />
                </SingleInfo>
            }
            { fondationDate &&
                <SingleInfo
                    title={lang.fondationDate}
                    className={"mb-3"}>
                    <TimeTag date={fondationDate} format={FULL_HUMAN_DATE_FORMAT} />
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
            {
                equipment &&
                <SingleInfo title={lang.Equipments} className={"mb-3 mt-2"}>
                    <ul className={`container mt-2 ${styles["equipment-container"]}`}>
                            <li className="row">
                                <div className="d-flex">
                                    <div className={`text-secondary ${styles["equipment-row__qty"]}`}>Qte</div>
                                    <div className={`col text-secondary`}>Nom</div> 
                                    <div className="col text-secondary">Model</div>  
                                    <div className="col text-secondary">Marque</div>  
                                </div> 
                            </li>
                        {
                            equipment.map(equip => {
                                const model = new Equipment(equip.equipment);
                                
                                console.log(model, "model")
                                return (
                                    <li className={` ${styles["equipment-row"]} row border-top py-2`}>
                                        <Link href={model.singleLink} title={model.name}>
                                            <div className="d-flex">
                                                <div className={`${styles["equipment-row__qty"]}`}>{equip.qty}</div>
                                                <div className={`col ${styles["equipment-row__name"]}`}>{model.label}</div> 
                                                <div className="col">{model.modelName}</div>  
                                                <div className="col">{model.brand}</div>  
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