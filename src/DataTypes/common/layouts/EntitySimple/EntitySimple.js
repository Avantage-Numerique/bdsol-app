import React from 'react';

//Components
import KebabButton from '@/common/FormElements/KebabButton/KebabButton'

//Styling
import styles from './EntitySimple.module.scss';

/********* 
 * 
 *   Component that gives the base styling and functionalities for the Simple components
 *      @param props.redirectionLink {String} Active un bouton kebab de redirection vers le single de l'élément
 *      @param props.overRidingHeader {JSX Component} When declared, it override the normal content of the header to allow personalization of the section
 *      @param props.overRidingContent {JSX Component} When declared, it override the normal content of the main section to allow personalization of the section
 *      @param props.entityType  {String}  Displayed over the picture : Organisation / Personne / etc
 *      @param props.title  {String}  Main displayed title. Can be a name of person, of an organisation, the title of a project, etc
 *      @param props.imgSrc  {String} Link to the image representing the entity
 *      @param props.imgAlt  {String} Alt text for the image
 *      @param props.description  {String} Description 
 *      @param props.tagListTitle {String} Title of the section containing a list of tag
 *      @param props.tagList  {Object}  List to be displayed of individual tags
 *      @return {JSX.Element}
 *      @constructor
*/


const EntitySimple = props => {

    /**** Deconstructiong props ******/
    const {
        //Props for this component fonctionalities
        redirectionLink,                                
        overRidingHeader,
        overRidingContent,
        entityType,
        //Props for informations to display
        title,
        imgSrc,
        imgAlt,
        description,
        tagListTitle,
        tagList,
        tagKeyName,
    } = props;

    const entityType_to_display = {
        organisation: "Organisation",
        project: "Projet",
        person: "Personne"
    }

    
    return (
        <article className={`rounded ${styles["simple-abstract"]}`}>
            {/* SECTION 1/2 : Header */}
            <header className={`${styles["simple-abstract__header"]}`}>
                {/* Override the display of the normal visual if there is the overRidingHeader is defined */}
                { overRidingHeader ? {overRidingHeader} :
                    <> 
                        {/* Image representing the entity */}
                        { imgSrc && imgAlt &&
                            <div>
                                <a href={redirectionLink} title={title}>
                                    <figure className="position-absolute top-0 start-0 w-100 h-100 t-0 ">
                                        <img src={imgSrc} alt={imgAlt} className={`${styles["simple-abstract__header__img"]}`} />
                                        <div className={`position-absolute w-100 h-100 no-pointer-events ${styles["radient-cover"]}`}></div>
                                    </figure>
                                </a>
                            </div>
                        }
                        {/* Display over the entity the type of image */}
                        {entityType && entityType_to_display[entityType] &&
                            <h4 className={`position-relative text-white fw-normal ${styles["entity-type"]}`}>{entityType_to_display[entityType]}</h4>
                        }
                    </>
                }
            </header>
            {/* SECTION 2/2 : Main content */}
            <section className={`${styles["simple-abstract__content"]}`}>
                { overRidingContent ? {overRidingContent} : 
                    <>
                        <header className="d-flex justify-content-between">
                            {/* Main name of the entity */}
                            <h3 className={`${styles["simple-abstract__content__title"]}`}>{title}</h3>
                            {/* Redirection button */}
                            { redirectionLink && <KebabButton href={redirectionLink} /> }
                        </header>
                        <section>
                            {/* Description */}
                            {description && <p className={`${styles["simple-abstract__content__description"]}`}>{description}</p>}
                            {/* List of tags */}
                            {tagList && tagListTitle &&
                                <h4>{tagListTitle}</h4>
                            }
                            {tagList && tagList.length > 0 &&
                                <ul className={`d-flex flex-wrap ${styles["simple-abstract__content__tagList"]}`}>
                                    {tagList.map(tag => (
                                        <li className="rounded">{tag[tagKeyName]}</li>
                                    ))}
                                </ul>
                            }
                        </section>
                    </>
                }
            </section>
        </article>
    )
}

export default EntitySimple