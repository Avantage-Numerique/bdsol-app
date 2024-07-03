import React, {useEffect, useState} from 'react';
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase"
import SingleBaseHeader from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader"
import SearchTag from '@/src/common/Components/SearchTag';
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";
import SingleBaseProgressBar
    from '@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseProgressBar/SingleBaseProgressBar'
import SocialHandleDisplay from '@/src/DataTypes/common/layouts/SocialHandlesViews/SocialHandleDisplay';
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import {SingleEntityMeta} from "@/src/DataTypes/Meta/components/SingleEntityMeta";
import {lang} from "@/common/Data/GlobalConstants";
import Person from "@/DataTypes/Person/models/Person";
import EntitiesTagGrid from "@/DataTypes/Entity/layouts/EntitiesTagGrid";
import {SkillGroup} from "@/DataTypes/common/layouts/skillsGroup/SkillGroup";
import {removeTagsFromString} from '@/src/helpers/html'
import {ContactPointView} from '@/src/DataTypes/common/layouts/ContactPointView/ContactPointView';
import BadgesSection from '@/src/DataTypes/Badges/BadgesSection';


const PersonSingleView = ({ data }) => {

    //Destructuring of data's prop
    const { 
        _id,
        firstName,
        lastName,
        nickname,
        description,
        occupations,
        domains,
        slug,
        catchphrase,
        createdAt,
        updatedAt,
        meta,
        mainImage,
        organisations,
        projects,
        events,
        contactPoint,
        url
    } = data;

    //To display occupations in the proper order
    const sortedOccupations = occupations?.[0]?.subMeta?.order ? occupations.sort((a,b) => a.subMeta.order - b.subMeta.order) : occupations;

    const model = new Person(data);

    const breadcrumbLabels = {
        "personnes": lang.Persons,
        "slug": `${firstName} ${lastName}`
    };

    const [breadCrumb, setBreadCrumb] = useState({
        route: model.singleRoute,
        labels: breadcrumbLabels,
    });

    useEffect(() => {
        setBreadCrumb({
            route: model.singleRoute,
            labels: breadcrumbLabels,
        });
    }, [firstName]);



    /****************************
     *  Sections
     ***************************/

    const Header = (
        <SingleBaseHeader
            title={(
                <div className="d-flex flex-wrap justify-content-start align-items-end">
                    <h1 style={{lineHeight: "1em"}} className="me-2 mb-0">{`${model.title}`}</h1>
                    <p className=" mb-0 fs-4">{model.nickname ? "(" + model.nickname + ")" : ""}</p>
                </div>
            )}

            subtitle={(
                <i className="mt-2 fw-semibold"><blockquote className="text-dark">{catchphrase}</blockquote></i>
            )}
            mainImage={model.mainImage}
            entity={model}
            buttonText={lang.contributeButtonLabel}
            buttonLink={model.singleEditLink}
        />
    )

    const FullWidthContent = (
        <>
            {description !== '' &&
                <SingleInfo
                    title={lang.about}
                    NAMessage="Aucune description n'est disponible pour le moment"
                    //cardLayout
                >
                    {   removeTagsFromString(description) &&
                        <SanitizedInnerHtml>
                            {description}
                        </SanitizedInnerHtml>
                    }
                </SingleInfo>
            }
        </>
    )

    const ContentColumnLeft = (
        <>
            <SingleInfo
                title={lang.skillsAndTechnologies}
                NAMessage="Aucune compétence et techonologie n'est disponible pour le moment"
                NAComponent={(
                    <div>
                        <p className="mb-2">Exemple : </p>
                        <div className="ms-2">
                            <h5 className="text-dark">Programmeur</h5>
                            <ul className="d-flex flex-wrap gap-2 mb-0">
                                <li className="rounded badge py-1 text-dark mb-1 px-2 bg-primary-light"><small>WordPress</small></li>
                                <li className="rounded badge py-1 text-dark mb-1 px-2 bg-primary-light"><small>MySQL</small></li>
                                <li className="rounded badge py-1 text-dark mb-1 px-2 bg-primary-light"><small>UX Design</small></li>
                            </ul>
                        </div>
                    </div>
                )}
                cardLayout
            >
                {/* Display the different groups of occupations */}
                { sortedOccupations && sortedOccupations?.length > 0 &&
                    sortedOccupations.map(occ => (
                        <SkillGroup
                            label={occ.groupName}
                            skills={occ.skills}
                            key={occ.groupName}
                        />
                    ))
                }
            </SingleInfo>
            
            {/* Show linked entities as tag */}
            {projects.length > 0 &&
                <SingleInfo 
                    title={`${lang.plural(lang.memberOfProject, lang.memberOfProjects, projects.length)}`} 
                    cardLayout
                >
                    <EntitiesTagGrid feed={projects} />
                </SingleInfo>
            }

            {organisations.length > 0 &&
                <SingleInfo title={`${lang.plural(lang.memberOfOrganisation, lang.memberOfOrganisations, organisations.length)}`} cardLayout>
                    <EntitiesTagGrid feed={organisations}/>
                </SingleInfo>
            }

            {events.length > 0 &&
                <SingleInfo title={`${lang.plural(lang.attendThisEvent, lang.attendTheseEvents, events.length)}`} cardLayout>
                    <EntitiesTagGrid feed={events}/>
                </SingleInfo>
            }
        </>
    )

    const ContentColumnRight = (
        <>
            {/* Badges */}
            <BadgesSection badges={model.badges}/>

            {/* Contact information */}
            <SingleInfo title={lang.organisationContact} cardLayout>
                <ContactPointView contact={model.contactPoint}/>
            </SingleInfo>
            
            {domains.length > 0 &&
                <SingleInfo 
                    title={lang.Domains} 
                    cardLayout
                >

                    {/*********** Domains ***********/}
                    <SearchTag
                        list={domains}
                        listProperty={"domain"}
                    />
                </SingleInfo>
            }
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
                    {data: (firstName + " " + lastName) || ""},
                    {data: nickname},
                    {data: description},
                    {data: occupations},
                    {data: domains},
                    {data: catchphrase},
                    {data: model.mainImage.isDefault, validationFunction: ((value) => !value)},
                ]}
                buttonText={lang.contributeButtonLabel}
                buttonLink={model.singleEditLink}
            />
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
                singlePageBottom={SinglePageBottom}
                model={model}
            />
            
        </>
    )
}

export default PersonSingleView