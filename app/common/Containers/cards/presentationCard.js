
//Components
import SanitizedInnerHtml from '../../../utils/SanitizedInnerHtml'

import styles from './presentationCard.module.scss'

/*

        ABOUT...

        This component is currently used to display the infos of every type of entity
        although this purpose is probably way to large for only one component. 

        In the futur, we'll have to think of something more durable and scalable. 
        One option would be a general card component that receives the data and its structure
        from every data entity folder.


*/

const PresentationCard = ({header, name, firstname, description, username, createdAt, url, contactPoint}) => {

    return (

        <article className={`${styles["card"]}`}>

            {/* The header has been tough to receive the data type : Ex. Personne*/}
            <header className="col-12">
                <div className="col-12">
                    <h5 className="col-12">{ header }</h5>
                </div>
            </header>

            {/* Background img */}
            <figure className="col-12">

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
                
                <div></div>
            </figure>

            {/************************************ 
                 
                 Main content of the component
            
            **************************************/}

            <section className={`${styles["card__content"]}`}>

                <h4 className="col-12">{firstname && firstname} {name}</h4>
                <p className="col-12">
                    <SanitizedInnerHtml>
                        { description }
                    </SanitizedInnerHtml>
                </p>

                <div className={`${styles["card__inner-line"]}`}></div>
                
                {/**********  URL ************/}
                { url && 
                <div className={`col-12 ${styles["card__infos"]}`}>
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
                <div className={`col-12 ${styles["card__infos"]}`}>
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
                <div className={`col-12 ${styles["card__infos"]}`}>
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
                <div><strong>Créé par</strong> inconnu</div>
                <div>{(new Date(createdAt)).toLocaleDateString('en-GB')}</div>
            </div> 

        </article>
    )
}

export default PresentationCard