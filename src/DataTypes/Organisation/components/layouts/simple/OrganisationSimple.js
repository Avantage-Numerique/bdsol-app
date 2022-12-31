import React from "react"
import getConfig from 'next/config';


/***  Components  ****/
import Simple from '@/DataTypes/common/layouts/simple/Simple'
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import KebabButton from '@/common/FormElements/KebabButton/KebabButton'


/***  Local styling ***/
import styles from './OrganisationSimple.module.scss'

const OrganisationSimple = ({ data }) => {

    const { publicRuntimeConfig } = getConfig();

    const {
        //contactPoint,
        createdAt,
        description,
        //fondationDate,
        name,
        offers,
        //slug,
        //status,
        //team,
        //url,
        //updatedAt
    } = data

    console.log(data)

    const defaultOrgAvatar = '/general_images/Jurassic_Park_Main_Gate.jpg';

    
    return (
        <Simple className={`${styles["org-simple"]}`}>

            {/******** Top img ***********/}
            <figure className={`position-relative top-0 start-0 w-100 mb-0 ${styles["org-img-content"]}`}>
                <img
                    className={`position-absolute w-100 h-100 ${styles["org-img"]}`}
                    src={defaultOrgAvatar}
                    alt={`${name}`}
                />
                <div className={`position-absolute w-100 h-100 ${styles["radient-cover"]}`}></div>
                <figcaption className={`bottom-0  position-absolute ${styles["figcaption"]}`}>
                    <small>
                    Organisation

                    </small>
                </figcaption>
                <div className="position-absolute top-0 end-0">
                    <div className="p-3">
                        <KebabButton color="reverse" />
                    </div>
                </div>
            </figure>

            <div className={`${styles["container-padding"]}`}>
                
                {/******** Header ***********/}
                <header className={`d-flex justify-content-between`}>
                    <h3 className="mt-0 h4">{name}</h3>
                    <KebabButton />
                </header>

                {/******** Presentation ***********/}
                <section className={`${styles["org-section-presentation"]}`}>
                    <SanitizedInnerHtml>
                        { description }
                    </SanitizedInnerHtml>
                    <div className={`${styles["presentation-white-gradient"]}`}>
                    </div>
                </section>

                {/******** Presentation ***********/}
                {offers && (offers.length > 0) &&
                <section className={`${styles["org-section-offers"]}`}>
                    <h4 className="h6 rejected">Services</h4>
                    <ul className={`mt-0 w-100 d-inline-flex flex-wrap ${styles["offers-container"]}`}>
                        {
                            offers.map((elem, index) => (
                                <>
                                    {   (index < 3) &&
                                        <li key={"off" + elem.offer._id} className={`mw-100 border text-general-tag rounded-4 d-flex text-truncate text-nowrap ${styles["offer"]}`}><div className="text-truncate">{elem.offer.name}</div></li>
                                    }
                                    {   (index == 3) &&
                                        <li key={"off999999999999"} className={`mw-100 border text-general-tag rounded-4 d-flex text-truncate text-nowrap ${styles["offer"]}`}><div className="text-truncate">...</div></li>
                                    }
                                </>
                            ))
                        }
                    </ul>
                </section>
                }

                {/******** Footer ***********/}
                <div className="border-bottom my-1"></div>
                <footer className={`${styles["org-footer"]}`}>
                    <div className="d-flex justify-content-between">
                        <small>
                            Créé le
                        </small>
                        <small>
                            <time>
                                {(new Date(createdAt)).toLocaleDateString(publicRuntimeConfig.dates.defaultLanguage)}
                            </time>
                        </small>
                    </div>
                </footer>
            </div>

        </Simple>
    )
}

export default OrganisationSimple