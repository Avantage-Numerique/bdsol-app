import React from 'react' 

//Components
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml'
import Button from '@/src/common/FormElements/Buttons/Button/Button'

//Styling
import styles from './MainPersonView.module.scss'


const MainPersonView = ({ data }) => {


    const { 
        _id,
        firstName,
        lastName,
        nickname,
        description,
        createdAt,
        updatedAt
    } = data

    const unavailableInfoMessage = <p>Aucune donnée n'a encore été fournie pour ce champ. <br/>Vous pourrez bientôt passer en mode édition afin d'ajouter et modifier des information.</p>
    

    return (

        <article className={`${styles["main-person-view"]}`}>
            
            {/*
            *
            *  HEADER 
            * 
            */}
            <header>

                {/* Background image */}
                <figure>
                    <img src="/general_images\forestBG.jpg" alt="Background image for a person card"/>
                    <div className={`${styles["black-gradient"]}`}></div>
                </figure>


                {/* Text content */}
                <div className={`${styles["headers-content"]}`}>

                    <div className={`${styles["headers-content__top-options"]}`}> 
                        <Button> &#8629; Retour </Button>
                        <div>
    
                            <form>
                                <label>
                                    Mode d'affichage
                                    <select >
                                        <option value="viewing">Lecture</option>
                                        <option disabled value="commenting">Commentaires</option>
                                        <option disabled value="editing">Édition</option>
                                    </select>
                                </label>
                            </form>
                        </div>
                    </div>

                    {/* Main content of the header */}
                    <div className={`
                        ${styles["headers-content__main-section"]}
                        ${styles["two-divisions-container"]}
                    `}>

                        <div>
                            <h2>{firstName} {lastName}</h2>
                            <p> {nickname} </p>

                            {/*
                            *
                            *      Quick informations
                            * 
                            */}

                            <div className={`${styles["quick-section"]}`}>

                                <div className={`${styles["quick-section__single-info"]}`}>
                                    <span>Langue : </span>Inconnu
                                </div>

                                <div className={`${styles["quick-section__single-info"]}`}>
                                    <span>Citoyenneté : </span>Inconnu
                                </div>

                            </div>

                        </div>

                        <aside>
                            <div>
                                <p>Ceci est une proposition d'appel à l'action. Il reste donc à déterminer s'il est pertinent et quoi mettre à l'intérieur.</p>
                                <Button size="small">Appel à l'action</Button>
                            </div>
                        </aside>

                    </div>

                    {/* Profile picture section */}
                    <div className={`${styles["headers-content__bottom-row"]}`}>
                        <figure className={`${styles["headers-content__profil-picture"]}`}>
                            <img src="/general_images/Dennis_Nedry.webp" alt="Background image for a person card" />
                        </figure>
                    </div>

                </div>

            </header>



            {/*
            *
            *  MAIN SECTION
            * 
            */}
            <section className={`${styles["main-section"]}`}>

                <div className={`col-12 ${styles["two-divisions-container"]}`}>

               

                <div>
                    <div className={`${styles["main-section__single-info"]}`}>
                        <h4>
                            Présentation
                        </h4>
                        {/* If there is a description */}
                        {
                            !description && 
                            <SanitizedInnerHtml>
                                { description }
                            </SanitizedInnerHtml>
                        }

                        {   
                            description &&
                            unavailableInfoMessage
                        }
                        
                    </div>

                    <div className={`${styles["main-section__single-info"]}`}>
                        <h4>
                            Projets
                        </h4>
                        <div className={`${styles["main-section__project"]}`}>
                            <p>+ Ajouter un projet auquel Jonathan collabore</p>
                        </div>
                    
                    </div>

                    <div className={`${styles["main-section__single-info"]}`}>
                        <h4>
                            Intérêts
                        </h4>
                        ajouter les organismes et autres trucs ...
                    </div>
                </div>

                <aside>

                <div className={`${styles["main-section__single-info"]}`}>
                    <h4>Moyen de contact</h4>
                    <p>Tel : (819) 764-5692 <br/>
                    Email : mail@mail.com
                    </p>
                </div>

                <div className={`${styles["main-section__single-info"]}`}>
                    <h4>Adresse</h4>
                    <p>234 rue Larivière<br/>
                    Rouyn-Noranda, Qc
                    </p>
                </div>

                <div className={`${styles["main-section__single-info"]}`}>
                    <h4>Compétences</h4>
                    <div className={`${styles["main-section__single-competency"]}`}>
                        Développement Web
                    </div>
                    <div className={`${styles["main-section__single-competency"]}`}>
                        SEO
                    </div>
                    <div className={`${styles["main-section__single-competency"]}`}>
                        Javascript
                    </div>
                    <div className={`${styles["main-section__single-competency"]}`}>
                        Design graphique
                    </div>
                
                </div>
              


                </aside>

                </div>



            </section>


        </article>

    )
}


export default MainPersonView
