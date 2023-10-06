import React, {useCallback} from 'react';

//components
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase"
import SingleBaseHeader from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader"
import SearchTag from '@/src/common/Components/SearchTag';
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";

//Styling
import styles from './PersonSingle.module.scss'

//Utils
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import {SingleEntityMeta} from "@/src/DataTypes/Meta/components/SingleEntityMeta";
import {lang} from "@/common/Data/GlobalConstants";
import Person from "@/DataTypes/Person/models/Person";
import EntitiesTagGrid from "@/DataTypes/Entity/layouts/EntitiesTagGrid";
import {SkillGroup} from "@/DataTypes/common/layouts/skillsGroup/SkillGroup";
import {appConfig} from "@/src/configs/AppConfig";


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
        events
    } = data;

    //To display occupations in the proper order
    const sortedOccupations = occupations?.[0]?.subMeta?.order ? occupations.sort((a,b) => a.subMeta.order - b.subMeta.order) : occupations;

    const model = new Person(data);

    const sectionClassSpacing = appConfig.spacing.singleSectionSpacingClass;

    //Edit the skills list
    const SkillsList = ({occupations}) => {
        //Extract every skill objects from the occupations
        const arrayOfSkillObjects = occupations.map(occ => occ.skills);
        //Extract the values of those objects
        const arrayOfSkills = arrayOfSkillObjects ? arrayOfSkillObjects.flat(1) : [];
        //Only keep single instances
        let arrayUniqueBy_id = [...new Map(arrayOfSkills.map(item => [item["_id"], item])).values()];
        //Sort the array before returning the value
        arrayUniqueBy_id.sort((a, b) => {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            // names must be equal
            return 0;
          });
        return (
            <SearchTag
                list={arrayUniqueBy_id}
            />
        );   
    }

    const OccupationGroup = ({occupationName, skillList}) => {
        return (
            <article className={`d-flex flex-column p-2 ${sectionClassSpacing} ${styles["occupation-group"]} border-start`}>
                <h5 className="text-dark mb-2">{occupationName}</h5>
                    <SearchTag className={"m-0"}
                        list={skillList}
                    />
            </article>
        )
    }

    /* Needed for breadCrumb generator */
    const getLabelGenerator = useCallback((param, query) => {
        return {
            "persons": lang.Persons,
            "slug": `${firstName} ${lastName}`        
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
            title={(<SanitizedInnerHtml tag={"h1"} className="text-white">{`${model.title}`}</SanitizedInnerHtml>)}
            subtitle={(
                <div className="d-text">
                    <h4 className="text-white">{nickname}</h4>
                    <i><blockquote className="text-white">{catchphrase}</blockquote></i>
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
            {description !== '' &&
                <SingleInfo
                    title={"Présentation"}
                    NAMessage="Aucune description n'est disponible pour le moment"
                    className={"mb-3 mt-3"}>
                    {description &&
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
            { occupations.length > 0 &&
                <SingleInfo
                    title={"Occupations"}
                    NAMessage="Aucune occupation n'est disponible pour le moment"
                    className={`mb-4 mt-3 pt-2 ${sectionClassSpacing}`}
                >
                    {/* Display the different groups of occupations */}
                    { sortedOccupations && sortedOccupations.length > 0 &&
                        sortedOccupations.map(occ => (
                            <SkillGroup
                                label={occ.groupName}
                                skills={occ.skills}
                                key={occ.groupName}
                            />
                        ))
                    }
                </SingleInfo>
            }

            {/* Show linked entities as tag */}

            {projects.length > 0 &&
                <SingleInfo title={`${lang.plural(lang.memberOfProject, lang.memberOfProjects, projects.length)}`} className={`${sectionClassSpacing}`}>
                    <EntitiesTagGrid feed={projects} />
                </SingleInfo>
            }

            {organisations.length > 0 &&
                <SingleInfo title={`${lang.plural(lang.memberOfOrganisation, lang.memberOfOrganisations, organisations.length)}`} className={`${sectionClassSpacing}`}>
                    <EntitiesTagGrid feed={organisations}/>
                </SingleInfo>
            }

            {events.length > 0 &&
                <SingleInfo title={`${lang.plural(lang.attendThisEvent, lang.attendTheseEvents, events.length)}`} className={`${sectionClassSpacing}`}>
                    <EntitiesTagGrid feed={events}/>
                </SingleInfo>
            }
        </>
    )

    const ContentColumnRight = (
        <>
        {domains.length > 0 &&
            <SingleInfo title={lang.domainsSingleLabel} className={`${sectionClassSpacing}`}>

                {/*********** Domains ***********/}
                <SearchTag
                    list={domains}
                    listProperty={"domain"}
                />
            </SingleInfo>
        }
        </>
    )

    const Footer = (
        <>
            {
                (createdAt || updatedAt || meta) &&
                <SingleEntityMeta createdAt={createdAt} updatedAt={updatedAt} meta={meta} />
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

export default PersonSingleView