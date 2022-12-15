import React from "react"

/***  Components  ****/
import Simple from '@/DataTypes/common/layouts/simple/Simple'

/***  Local styling ***/
import styles from './PersonSimple.module.scss'


const PersonSimple = ({ data, key, header }) => {

    const {
        slug,
        firstName,
        lastName,
        nickname,
        name,
        username,
        description,
        createdAt,
        url,
        contactPoint
    } = data

    return (
        <Simple className={`${styles["person-simple"]}`}>

            <header className={`d-flex flex-column ${styles["person-simple__header"]}`}>

                <section className={`d-flex justify-content-between ${styles["person-simple__header__top-section"]}`}>
                    {/* Empty container - user full for the layout of the row */}
                    <div className=""></div>
                    {/* Profil picture */}
                    <figure className={`mx-1 my-4 ${styles["person-simple__header__picture"]}`}>
                        <img src={"/general_images/Dennis_Nedry.webp"} alt={`Photo de profil de l'utilisateur ${firstName} ${lastName}`} />
                    </figure>
                    {/* Button to see more details */}
                    <button className={`d-flex ${styles["person-simple__header__button"]}`}>
                        <svg 
                            className="h-100"
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 10 36">
                                <circle cx="5" cy="5" r="4"/>
                                <circle cx="5" cy="18" r="4"/>
                                <circle cx="5" cy="31" r="4"/>
                        </svg>
                    </button>
                </section>
                {/* Header's text and infos */}
                <section className={`${styles["person-simple__header__bottom-section"]}`}>
                    <h3 className="text-center h4 mb-1">{firstName} {lastName}</h3>
                    {nickname && <h4 className="text-center h5 text-secondary fw-normal">{nickname}</h4>}
                    <ul className={`mt-3 w-100 d-inline-flex flex-wrap ${styles["occupations-container"]}`}>
                        <li className={`mw-100 py-1 px-2 border border-secondary text-secondary rounded-4 d-flex text-truncate text-nowrap ${styles["occupation"]}`}><div className="text-truncate">Développeur Web</div></li>
                        <li className={`mw-100 py-1 px-2 border border-secondary text-secondary rounded-4 d-flex text-truncate text-nowrap ${styles["occupation"]}`}><div className="text-truncate">Designer graphique</div></li>
                        <li className={`mw-100 py-1 px-2 border border-secondary text-secondary rounded-4 d-flex text-truncate text-nowrap ${styles["occupation"]}`}><div className="text-truncate">Chanteur de</div></li>
                    </ul>
                </section>

            </header>
            <div className="border-bottom my-1"></div>
            <section>
            
                
            </section>


        </Simple>
    )
}

export default PersonSimple