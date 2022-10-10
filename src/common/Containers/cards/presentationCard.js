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
            ${styles["card"]}
        `}>  
                
            <Container className="justify-content-between">

                <header>

                    <Row className={`py-2 ${styles["card__header-container"]}`}>
                      
                        {/* Type of data displayed in the header */}
                        <Col className="align-self-center">
                            <h5 className="m-0">{ header }</h5>
                        </Col>

                        {/* Redirection link */}
                        <Col className="d-flex justify-content-end">
                            <Button small>Voir</Button>
                        </Col>
                        
                    </Row>

                </header>

                <Row className={`${styles["card__img-container"]}`}>
                        
                        {/* Temporary shape */}
                        { header === "Organisation" &&
                            <img 
                                className={`px-0 ${styles["card__img-container__img"]}`}
                                src="/general_images/putin.webp"
                                alt="Photo de putin qui chevauche un ours" 
                            />
                        }

                        { header !== "Organisation" &&
                            <img 
                                className={`px-0 ${styles["card__img-container__img"]}`}
                                src="/general_images/Dennis_Nedry.webp"
                                alt="Photo de putin qui chevauche un ours" 
                            />
                        }

                </Row>
          

            </Container>

            {/************************************ 
                 
                Main content of the component
            
            **************************************/}
            <Container className="pt-3"> 
    
                <Row>
                    <section className={`${styles["card__content"]}`}>

                        <h3>{firstname && firstname} {name && name}</h3>

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
                </Row>

            </Container>   

            {/************************************ 
                 
                Article footer
            
            **************************************/}
            <footer className={` py-2 `}>
                <Container> 
                    <Row className="justify-content-between">
                        <Col sm="auto">
                            <time>
                                {(new Date(createdAt)).toLocaleDateString(publicRuntimeConfig.dates.defaultLanguage)}
                            </time>
                        </Col>
                        <Col sm="auto">
                            <time>
                                {(new Date(createdAt)).toLocaleTimeString(publicRuntimeConfig.dates.defaultLanguage)}
                            </time>
                        </Col>
                    </Row>
                </Container>    
            </footer> 
        </article>
    )
}

export default PresentationCard