import React from 'react';
import getConfig from 'next/config';

//Components
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import Button from '@/common/FormElements/Buttons/Button/Button'

//styling
import styles from './presentationCard.module.scss';
import getConfig from 'next/config';

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

    const showFullDescription = false;

    return (

        <article className={` bg-white  ${styles["card"]} `}>

            <div className="container justify-content-between">

                <header>

                    <div className={`row py-2 ${styles["card__header-container"]}`}>

                        {/* Type of data displayed in the header */}
                        <div className="col align-self-center">
                            <h5 className="m-0">{ header }</h5>
                        </div>

                        {/* Redirection link */}
                        <div className="col d-flex justify-content-end">
                            <Button disabled={(header === "Organisation")} href={`persons/${slug}`} small >Voir</Button>
                        </div>

                    </div>
                </header>

                <div className={`row ${styles["card__img-container"]}`}>

                        {/* Temporary shape */}
                        { header === "Organisation" &&
                            <img
                                className={`px-0 ${styles["card__img-container__img"]}`}
                                src="/general_images/Jurassic_Park_Main_Gate.jpg"
                                alt="Organisation"
                            />
                        }

                        { header !== "Organisation" &&
                            <img
                                className={`px-0 ${styles["card__img-container__img"]}`}
                                src="/general_images/Dennis_Nedry.webp"
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
                    <Row xs={"auto"} className={`${styles["card__content__single-info"]}`}>
                        <Col xm={3} className={`fw-semibold`}>
                            <p>Url :</p>
                        </Col>
                        <Col>
                            <p className="text-truncate"> {url}</p>
                        </Col>
                    </Row>
                    }

                    {/**********  contactPoint ************/}
                    { contactPoint &&
                    <Row xs={"auto"} className={`${styles["card__content__single-info"]}`}>
                        <Col xm={3} className={`fw-semibold`}>
                            <p>Contact :</p>
                        </Col>
                        <Col>
                            <p className="text-truncate">{contactPoint}</p>
                        </Col>
                    </Row>
                    }

                    {/**********  username  ************/}
                    { username &&
                    <Row xs={"auto"} className={`${styles["card__content__single-info"]}`}>
                        <Col xm={3} className={`fw-semibold`}>
                            <p>Surnom :</p>
                        </Col>
                        <Col>
                            <p className="text-truncate">{username}</p>
                        </Col>
                    </Row>
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