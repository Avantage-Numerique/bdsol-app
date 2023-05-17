import React from 'react';

//Components
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase"
import Button from "@/FormElements/Button/Button";
import PersonSingleEdit from "@/src/DataTypes/Person/Components/Forms/CreatePerson/PersonSingleEdit";
import SearchTag from '@/src/common/Components/SearchTag';
import Single from "@/DataTypes/common/layouts/single/Single";
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";
import UpdateSkillGroup from '@/src/DataTypes/common/Forms/UpdateSkillGroup/UpdateSkillGroup';

//Styling
import styles from './PersonSingle.module.scss'

//Hooks
import {useModal} from "@/src/hooks/useModal/useModal";

//Utils
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import {SingleEntityStatus} from "@/DataTypes/Status/Components/SingleEntityStatus";
import {lang} from "@/common/Data/GlobalConstants";
import {useAuth} from "@/auth/context/auth-context";


const PersonSingleBaseView = ({ data }) => {

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
            <SingleInfo title={"Occupations"}
                NAMessage={<p></p>}
            >    
                {/* Display the different groups of occupations */}
                { occupations &&
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

    const ContentColumnRight = () => (
        <> 
            
            {/************ Skills *************/}
            <SingleInfo title={"Compétences"}
                NAMessage={<p>Vous n'avez aucune compétence d'entrée pour le moment</p>}
            >
                <SkillsList occupations={occupations}/>
            </SingleInfo>
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
                status?.state &&
                    <SingleInfo className={singleInfoCommonClass}
                        title="Statut de l'entité">
                        <p>{status.state === 'accepted' ? "Acceptée" : "En attente d'approbation"}</p>
                    </SingleInfo>
            }

            {
                (createdAt || updatedAt || status) &&
                <SingleEntityStatus className={singleInfoCommonClass} createdAt={createdAt} updatedAt={updatedAt} status={status} />
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

export default PersonSingleBaseView