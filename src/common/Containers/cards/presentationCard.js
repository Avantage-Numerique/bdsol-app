
//Components
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import {useAuth} from '@/src/authentification/context/auth-context';
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

const PresentationCard = ({header, name, firstname, description, username, createdAt, url, contactPoint}) => {

    const auth = useAuth();
    const showFullDescription = false;

    return (

        <article className={`${styles["card"]}`}>

            {/* The header has been tough to receive the data type : Ex. Personne*/}
            <header>
                <div>
                    <h5>{ header }</h5>
                </div>
            </header>

            {/* Background img */}
            <figure>

                { header === "Organisation" &&
                    <img 
                        src="/general_images/putin.webp"
                        alt="Photo de putin qui chevauche un ours" 
                    />
                }

                { header !== "Organisation" &&
                    <img 
                        src="/general_images/Dennis_Nedry.webp"
                        alt="Photo de putin qui chevauche un ours" 
                    />
                }

            </figure>

            {/************************************ 
                 
                 Main content of the component
                @todo change markup for more robot friendly ones, p, h, etc.
            
            **************************************/}

            <section className={`${styles["card__content"]}`}>
                <h4>{firstname && firstname} {name}</h4>
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

            <div className={`${styles["card__infos__sub-section"]}`}>
                {/*<div><strong>Créé par</strong> {auth.username} </div>*/}
                <p>{(new Date(createdAt)).toLocaleDateString(publicRuntimeConfig.dates.defaultLanguage)}</p>
                <p>{(new Date(createdAt)).toLocaleTimeString(publicRuntimeConfig.dates.defaultLanguage)}</p>
            </div>

        </article>
    )
}

export default PresentationCard