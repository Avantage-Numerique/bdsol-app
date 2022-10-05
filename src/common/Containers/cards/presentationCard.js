import React from 'react';
import getConfig from 'next/config';

//Components
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import Button from '@/common/FormElements/Buttons/Button/Button'

//styling
import styles from './presentationCard.module.scss';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const { publicRuntimeConfig } = getConfig();
/*
    ABOUT...

    This component is currently used to display the infos of every type of entity
    although this purpose is probably way to large for only one component.

    In the futur, we'll have to think of something more durable and scalable.
    One option would be a general card component that receives the data and its structure
    from every data entity folder.
*/

const PresentationCard = ({header, name, firstname, description, username, createdAt, url, contactPoint}) => {

    const showFullDescription = false;

    return (

        <article className={`
            bg-white 
            shadow-sm
            ${styles["card"]}
        `}>  
                
            <Container fluid>

                <Button>Consulter</Button>
                
                <Row >
                    {/* Background img */}
                    <figure className={`
                        ${styles["card__img-container"]}
                    `}>

                        {/*
                        *
                        *      Temporary styling
                        *      
                        */}
                        { header === "Organisation" &&
                            <img 
                                className={`${styles["card__img-container__img"]}`}
                                src="/general_images/putin.webp"
                                alt="Photo de putin qui chevauche un ours" 
                            />
                        }

                        { header !== "Organisation" &&
                            <img 
                                className={`${styles["card__img-container__img"]}`}
                                src="/general_images/Dennis_Nedry.webp"
                                alt="Photo de putin qui chevauche un ours" 
                            />
                        }

                    </figure>

                </Row>
          

            </Container>

            {/************************************ 
                 
                Main content of the component
                @todo change markup for more robot friendly ones, p, h, etc.
            
            **************************************/}
            <Container>  

                <Row>
                    {/* The header has been tough to receive the data type : Ex. Personne*/}
                    <header>
                        <div>
                            <h5>{ header }</h5>
                        </div>
                    </header>
                </Row>
    
                <Row>
                    <section className={`${styles["card__content"]}`}>

                        <h4>{firstname} {name}</h4>

                        {showFullDescription &&
                            <div>
                                <SanitizedInnerHtml>
                                    { description }
                                </SanitizedInnerHtml>
                            </div>
                        }

                        <div className={`${styles["card__inner-line"]}`}></div>
                        
                        {/**********  URL ************/}
                        { url && 
                        <div className={`${styles["card__infos"]}`}>
                            <div className={`${styles["card__infos--titles"]}`}>
                                <div>Url :</div>
                            </div>
                            <div>   
                                <div> {url}</div>
                            </div>
                        </div>
                        }

                        {/**********  contactPoint ************/}
                        { contactPoint &&
                        <div className={`${styles["card__infos"]}`}>
                            <div className={`${styles["card__infos--titles"]}`}>
                                <div>Contact :</div>
                            </div>
                            <div>   
                                <div>{contactPoint}</div>
                            </div>
                        </div>
                        }

                        {/**********  username  ************/}
                        { username &&
                        <div className={`${styles["card__infos"]}`}>
                            <div className={`${styles["card__infos--titles"]}`}>
                                <div>Surnom :</div>
                            </div>
                            <div>   
                                <div>{username}</div>
                            </div>
                        </div>
                        }
                    </section>
                </Row>

                <Row>
                    <div className={`${styles["card__infos__sub-section"]}`}>
                        {/*<div><strong>Créé par</strong> {auth.username} </div>*/}
                        <p>{(new Date(createdAt)).toLocaleDateString(publicRuntimeConfig.dates.defaultLanguage)}</p>
                        <p>{(new Date(createdAt)).toLocaleTimeString(publicRuntimeConfig.dates.defaultLanguage)}</p>
                    </div>
                </Row>

                </Container>        
        </article>
    )
}

export default PresentationCard