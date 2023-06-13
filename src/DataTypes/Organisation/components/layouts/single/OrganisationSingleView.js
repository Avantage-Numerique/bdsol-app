import { useCallback } from 'react';

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
import {replacePathname} from "@/src/helpers/url";

const OrganisationSingleView = ({ data }) => {

    //Destructuring of data's prop
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
    const link = "/"+replacePathname(model.singleEditRoute.pathname, {slug: model.slug});

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
            title={(<h2 className="text-white">{`${name}`}</h2>)}
            subtitle={(
                <div className="d-text">
                    <h4 className="text-white">{catchphrase}</h4>
                </div>
            )}
            mainImage={mainImage}
            entity={data}
            type="Organisation"
            buttonText="Proposer des modifications"
            buttonLink={link}
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
            <section className="mt-4">
                <h4 className="h5 my-3">Services offerts</h4>
                { offers?.length > 0 && offers.map(offer => (
                    <article key={offer.groupName} className={`d-flex flex-column p-2 mb-2 skill-group bg-light`}>
                        <h5 className="text-dark mb-1 group-name">{offer.groupName}</h5>
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
            <SingleInfo title={lang.teamMembers} className={"mb-3"}>
                <>
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
                </>
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
            { url &&
                <p><a href={url}>{url}</a></p>
            }
            {
                status?.state &&
                    <SingleInfo
                        title="Statut de l'entité">
                        <p>{status.state === 'accepted' ? "Acceptée" : "En attente d'approbation"}</p>
                    </SingleInfo>
            }

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