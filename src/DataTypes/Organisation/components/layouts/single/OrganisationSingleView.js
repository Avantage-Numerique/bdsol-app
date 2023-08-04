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
import {SingleEntityStatus} from "@/DataTypes/Status/components/SingleEntityStatus";
import Head from "next/head";
import {getTitle} from "@/DataTypes/MetaData/MetaTitle";
import EntitiesTagGrid from "@/DataTypes/Entity/layouts/EntitiesTagGrid";
import {ExternalLink} from "@/common/Components/ExternalLink";

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
        //status,
        team,
        updatedAt,
        url,
        status,
        //__v,
        //_id
    } = data;

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
        <SingleInfo title={"Présentation"} className={"mb-3 mt-4"}>
            <SanitizedInnerHtml>
                {description}
            </SanitizedInnerHtml>
        </SingleInfo>
    )

    const ContentColumnLeft = (
        <>
            {/*************** Offers *****************/}
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
            <SingleInfo title={lang.teamMembers} className={"mb-3"}>
                <EntitiesTagGrid feed={team} subEntityProperty={"member"} subBadgeProperty={"role"} noneMessage={lang.noTeamMemberSetMessage} />
            </SingleInfo>
            <SingleInfo title={lang.hyperlink} className={"mb-3"}>
                { url &&
                    <p>
                        <ExternalLink href={url} title={`${model.title}`}>
                            {url}
                        </ExternalLink>
                    </p>
                }
            </SingleInfo>
        </>
    )

    const ContentColumnRight = (
        <> 
            {/*********** Domains ***********/}
            <SingleInfo 
                title={lang.domainsSingleLabel} 
                className={"mb-3"}
                NAMessage="Aucun domaine d'activité n'est précisé pour le moment."
            >   
                {domains &&
                    <SearchTag
                        className="row"
                        list={domains}
                        listProperty={"domain"}
                    />
                }
                
            </SingleInfo>
            {/*********** Contact ***********/}
            <SingleInfo title={"Contact"} className={"mb-3"}>
                {contactPoint && contactPoint}
            </SingleInfo>
        </>
    )

    const Footer = (
        <div className="border-top border-bottom pt-2">
            {
                (createdAt || updatedAt || status) &&
                <SingleEntityStatus  
                    createdAt={createdAt} 
                    updatedAt={updatedAt} 
                    status={status} />
            }
        </div>
    )

    {/**************************
    *   Elements returned as props of the SingleBase
    */}
    return (
        <>
            <Head>
                <title>{getTitle([model.title, model.Type.label])}</title>
            </Head>
            <SingleBase 
                breadCrumb={breadCrumb}
                header={Header}
                fullWidthContent={FullWidthContent}
                contentColumnLeft={ContentColumnLeft}
                contentColumnRight={ContentColumnRight}
                footer={Footer}
            />
        </>
    )
}

export default OrganisationSingleView