import React from 'react';

//Components
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import Button from '@/common/FormElements/Buttons/Button/Button'

//styling
import styles from './presentationCard.module.scss';
import getConfig from 'next/config';
import {lang} from "@/common/Data/GlobalConstants";

const { publicRuntimeConfig } = getConfig();
/*
    ABOUT...

    This component is currently used to display the infos of every type of entity
    although this purpose is probably way to large for only one component.

    In the futur, we'll have to think of something more durable and scalable.
    One option would be a general card component that receives the data and its structure
    from every data entity folder.
*/

const PresentationCard = ({header, data}) => {

    const {
        slug,
        firstName,
        lastName,
        name,
        username,
        description,
        createdAt,
        url,
        contactPoint
    } = data

    //Dictionnary for entity type. Set header = { type : label }
    const dict = { "Person" : "Personne", "Organisation": "Organisation"}
    header = dict[header];

    const showFullDescription = false;
    const singleUrl = '/persons/'+slug;
    const defaultPersonAvatar = '/general_images/Dennis_Nedry.webp';
    const defaultOrgAvatar = '/general_images/Jurassic_Park_Main_Gate.jpg';

    return (
        <article className={`bg-white ${styles["card"]}`}>

            <div className="container">

                <header>

                    <div className={`d-flex justify-content-between align-items-center py-2 ${styles["card__header-container"]}`}>

                        {/* Type of data displayed in the header */}
                        <div className="">
                            <h5 className="m-0">{ header }</h5>
                        </div>

                        {/* Redirection link */}
                        <div className="">
                            <Button disabled={(header === "Organisation")} href={`${singleUrl}`} small >{lang.see}</Button>
                        </div>
                    </div>
                </header>

                <div className={`row ${styles["card__img-container"]}`}>
                        {/* Temporary */}
                        { header === "Organisation" &&
                            <img
                                className={`px-0 ${styles["card__img-container__img"]}`}
                                src={defaultOrgAvatar}
                                alt="Organisation"
                            />
                        }

                        { header !== "Organisation" &&
                            <img
                                className={`px-0 ${styles["card__img-container__img"]}`}
                                src={defaultPersonAvatar}
                                alt="Photo de putin qui chevauche un ours"
                            />
                        }
                </div>


            </div>

            {/*Main content of the component*/}

            <div className="container pt-3">
                <section className={`row ${styles["card__content"]}`}>

                    {name && <h3>{name}</h3>}
                    { (firstName || lastName) &&
                        <h3>{firstName && firstName} {lastName && lastName}</h3>
                    }

                    {showFullDescription &&
                        <div>
                            <SanitizedInnerHtml>
                                { description }
                            </SanitizedInnerHtml>
                        </div>
                    }

                    {/**********  URL ************/}
                    { url &&
                    <div className={`row ${styles["card__content__single-info"]}`}>
                        <div className={`col-2 fw-semibold`}>
                            <SanitizedInnerHtml tag={"p"}>{lang.urlLabel}</SanitizedInnerHtml>
                        </div>
                        <div className={`col`}>
                            <p className="text-truncate">{url}</p>
                        </div>
                    </div>
                    }

                    {/**********  contactPoint ************/}
                    { contactPoint &&
                    <div className={`row ${styles["card__content__single-info"]}`}>
                        <div className={`col-2 fw-semibold`}>
                            <SanitizedInnerHtml tag={"p"}>{lang.contactLabel}</SanitizedInnerHtml>
                        </div>
                        <div>
                            <p className="text-truncate">{contactPoint}</p>
                        </div>
                    </div>
                    }

                    {/**********  username  ************/}
                    { username &&
                    <div className={`row ${styles["card__content__single-info"]}`}>
                        <div className={`col-2 fw-semibold`}>
                            <SanitizedInnerHtml tag={"p"}>{lang.nicknameLabel}</SanitizedInnerHtml>
                        </div>
                        <div>
                            <p className="text-truncate">{username}</p>
                        </div>
                    </div>
                    }
                </section>
            </div>

            {/* Article footer */}
            <footer className={`container py-2 `}>
                <div className="row justify-content-between">
                    <div className={"col"}>
                        <time>
                            {(new Date(createdAt)).toLocaleDateString(publicRuntimeConfig.dates.defaultLanguage)}
                        </time>
                    </div>
                    <div className={"col"}>
                        <time>
                            {(new Date(createdAt)).toLocaleTimeString(publicRuntimeConfig.dates.defaultLanguage)}
                        </time>
                    </div>
                    </div>
            </footer>
        </article>
    )
}

export default PresentationCard