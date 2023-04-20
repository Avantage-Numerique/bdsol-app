import React from 'react';

//Components
import KebabButton from '@/common/FormElements/KebabButton/KebabButton'

//Styling
import styles from './EntitySimple.module.scss';

/********* 
 * 
 *   Component that gives the base styling and functionalities for the Simple components
 *      @param props.redirectionLink {React.Component} Active un bouton kebab de redirection vers le single de l'élément
 *      @return {JSX.Element}
 *      @constructor
*/


const EntitySimple = props => {

    /**** Deconstructiong props ******/
    const {
        //Props for this component fonctionalities
        redirectionLink,
        overRidingHeader,
        entityType,
        //Props for informations to display
        headersImg,
        headersImgAlt,
        title,
        description,
        tagListNames,
        tagList,
    } = props;

    

    return (
        <article className={`rounded ${styles["simple-abstract"]}`}>
            {/* SECTION 1/2 : Header */}
            <header>
                {/* Override the display of the normal visual if there is the overRidingHeader is defined */}
                { overRidingHeader ? {overRidingHeader} :
                    <> 
                        { headersImg && headersImgAlt &&
                            <div>
                                <figure>

                                </figure>
                                <div className={`position-absolute w-100 h-100 no-pointer-events ${styles["radient-cover"]}`}></div>
                            </div>
                        }
                    </>
                }
                {/* Redirection button */}
                { redirectionLink && <KebabButton href={redirectionLink} color="reverse" /> }
            </header>
            {/* SECTION 2/2 : Main content */}
            <section>
            </section>
        </article>
    )
}

export default EntitySimple