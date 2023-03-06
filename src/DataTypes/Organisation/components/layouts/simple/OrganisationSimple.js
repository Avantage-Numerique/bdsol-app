import React from "react"
import getConfig from 'next/config';


/***  Components  ****/
import Simple from '@/DataTypes/common/layouts/simple/Simple'
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import KebabButton from '@/common/FormElements/KebabButton/KebabButton'
import SearchTag from "@/src/common/Components/SearchTag";


/***  Local styling ***/
import styles from './OrganisationSimple.module.scss'
import {lang} from "@/common/Data/GlobalConstants";

const OrganisationSimple = ({ data }) => {

    const { publicRuntimeConfig } = getConfig();

    const {
        //contactPoint,
        createdAt,
        description,
        //fondationDate,
        name,
        offers,
        slug,
        mainImage,
        //status,
        //team,
        //url,
        //updatedAt
    } = data;

    const link = `/organisations/${slug}`;
    const type = lang.Organisation;//"Organisation";

    const defaultOrgAvatar = '/general_images/Jurassic_Park_Main_Gate.jpg';
    const mainImageAbsoluteUrl = mainImage?.url ? process.env.NEXT_PUBLIC_API_URL + mainImage.url : defaultOrgAvatar;

    return (
        <Simple className={`${styles["org-simple"]}`}>

            {/******** Top img ***********/}
            <figure className={`position-relative top-0 start-0 w-100 mb-0 ${styles["org-img-content"]}`}>
                <a href={link} title={name} className={"position-absolute w-100 h-100"} target={"_self"} rel={"follow"}>
                    <img
                        className={`position-absolute w-100 h-100 ${styles["org-img"]}`}
                        src={mainImageAbsoluteUrl}
                        alt={`${type} : ${name}`}
                    />
                </a>
                <div className={`position-absolute w-100 h-100 no-pointer-events ${styles["radient-cover"]}`}></div>
                <figcaption className={`bottom-0  position-absolute ${styles["figcaption"]}`}>
                    <small>
                        {type}
                    </small>
                </figcaption>
                <div className="position-absolute top-0 end-0">
                    <div className="p-3">
                        <KebabButton href={link} color="reverse" />
                    </div>
                </div>
            </figure>

            <div className={`${styles["container-padding"]}`}>
                
                {/******** Header ***********/}
                <header className={`d-flex justify-content-between`}>
                    <h3 className="mt-0 h4">{name}</h3>
                    <KebabButton href={link} />
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
                {offers?.length > 0 &&
                <section className={`${styles["org-section-offers"]}`}>
                    <h4 className="h6 rejected">{lang.Services}</h4>
                    <SearchTag
                        className="row"
                        max={3}
                        list={
                            offers.map( (entity) => {
                                return {
                                    label : entity.offer.name,
                                    url: "/"+entity.offer.category + "/" + entity.offer.slug
                                }
                            })
                        }
                    />
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