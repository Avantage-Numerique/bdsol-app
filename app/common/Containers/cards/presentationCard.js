
import styles from './presentationCard.module.scss'


const PresentationCard = ({name, description, createdAt, url, contactPoint}) => {

    return (
        <article className={`${styles["card"]}`}>

            <header className="col-12">
                <div className="col-12">
                    <h5 className="col-12">Organisation</h5>
                </div>
            </header>
            <figure className="col-12">
                <img 

                    src="/general_images/putin.webp"
                    alt="Photo de putin qui chevauche un ours" 
                />
                <div></div>
            </figure>

            {/************************************ 
                 
                 Main content of the component
            
            **************************************/}

            <section className={`${styles["card__content"]}`}>

                <h4 className="col-12">{name}</h4>
                <p className="col-12">{ description }</p>

                <div className={`${styles["card__inner-line"]}`}></div>

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

            </section>
            <div className={`${styles["card__infos__sub-section"]}`}>
                <div><strong>Créé par</strong> inconnu</div>
                <div>{(new Date(createdAt)).toLocaleDateString('en-GB')}</div>
            </div> 

        </article>
    )
}

export default PresentationCard