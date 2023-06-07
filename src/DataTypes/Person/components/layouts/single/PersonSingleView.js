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
import {SingleEntityStatus} from "@/DataTypes/Status/Components/SingleEntityStatus";
import {lang} from "@/common/Data/GlobalConstants";
import {replacePathname} from "@/src/helpers/url";
import Person from "@/DataTypes/Person/Models/Person";



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
        status,
        mainImage
    } = data;

    
    const model = new Person(data);
    const link = "/"+replacePathname(model.singleEditRoute.pathname, {slug: model.slug});

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
            <article className={`d-flex flex-column p-2 mb-2 ${styles["occupation-group"]}`}>
                <h5 className="text-dark mb-0">{occupationName}</h5>
                    <SearchTag
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
            title={(<h2 className="text-white">{`${firstName} ${lastName}`}</h2>)}
            subtitle={(
                <div className="d-text">
                    <h4 className="text-white">{nickname}</h4>
                    <i><blockquote className="text-white">{catchphrase}</blockquote></i>
                </div>
            )}
            mainImage={mainImage}
            entity={data}
            type="Personne"
            buttonText="Proposer des modifications"
            buttonLink={link}
        />
    )

    const FullWidthContent = (
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
    )

    const ContentColumnLeft = (
        <>
            <SingleInfo 
                title={"Occupations"}
                NAMessage="Aucune occupation n'est disponible pour le moment"
                className={"mb-3 mt-3"}
            >    
                {/* Display the different groups of occupations */}
                { occupations && occupations.length > 0 &&
                    occupations.map(occ => (
                        <OccupationGroup 
                            occupationName={occ.occupation} 
                            skillList={occ.skills}
                            key={occ._id}
                        />
                    ))
                }
            </SingleInfo>
        </>
    )

    const ContentColumnRight = (
        <> 
            {/*********** Domains ***********/}
            <SingleInfo title={lang.domainsSingleLabel} className={"mb-3"}>
                <SearchTag
                    className="row"
                    list={domains}
                    listProperty={"domain"}
                />
            </SingleInfo>
        </>
    )

    const Footer = (
        <>
            {
                status?.state &&
                    <SingleInfo className="border-top pt-3"
                        title="Statut de l'entité">
                        <p>{status.state === 'accepted' ? "Acceptée" : "En attente d'approbation"}</p>
                    </SingleInfo>
            }

            {
                (createdAt || updatedAt || status) &&
                <SingleEntityStatus className="border-bottom pb-2" createdAt={createdAt} updatedAt={updatedAt} status={status} />
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
            />
        </>
    )
}

export default PersonSingleView