import React from 'react' 

//Components
import SanitizedInnerHtml from '../../../../../app/utils/SanitizedInnerHtml'

//Styling
import styles from './MainPersonView.module.scss'


const MainPersonView = ({ data }) => {

    console.log(data)

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
                <div className={`${styles["headers-text"]}`}>
                    <div>
                        <button> &#8629; Retour </button>
                    </div>
                    <div className={`${styles["headers-text__main-section"]}`}>
                        <div className="col-8">
                            <h2>Jonathan Champoin</h2>
                            <p>shampoo boy</p>
                        </div>
                        <aside className="col-4">
                            <div className="col-10">comsacsa</div>
                        </aside>
                    </div>
                    <div>
                        <figure className={`${styles["headers-text__profil-picture"]}`}>
                            <img src="/general_images/Dennis_Nedry.webp" alt="Background image for a person card" />
                        </figure>
                    </div>

                </div>

            </header>

            {/*
            *
            *      Quick informations
            * 
            */}

            <section className={`${styles["quick-section"]}`}>

                <div className={`${styles["quick-section__single-info"]}`}>
                    <span>Langue : </span>Français
                </div>

                <div className={`${styles["quick-section__single-info"]}`}>
                    <span>citoyenneté : </span>Canadienne
                </div>

                <div className={`${styles["quick-section__single-info"]}`}>
                    <span>Langue : </span>Français
                </div>

            </section>


            {/*
            *
            *  MAIN SECTION
            * 
            */}
            <section className={`col-8 ${styles["main-section"]}`}>


                <div className={`${styles["main-section__single-info"]}`}>
                    <h4>
                        Présentation
                    </h4>
                    <SanitizedInnerHtml>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla laoreet orci, in scelerisque eros accumsan non. Ut lorem elit, rutrum vitae ornare quis, iaculis ac nisl. Sed sit amet pulvinar purus. Pellentesque orci massa.
                    </SanitizedInnerHtml>
                </div>

                <div className={`${styles["main-section__single-info"]}`}>
                    <h4>
                        Présentation
                    </h4>
                    <SanitizedInnerHtml>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla laoreet orci, in scelerisque eros accumsan non. Ut lorem elit, rutrum vitae ornare quis, iaculis ac nisl. Sed sit amet pulvinar purus. Pellentesque orci massa.
                    </SanitizedInnerHtml>
                </div>

                <div className={`${styles["main-section__complex-info"]}`}>
                    <h4>
                        Présentation
                    </h4>
                    <SanitizedInnerHtml>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla laoreet orci, in scelerisque eros accumsan non. Ut lorem elit, rutrum vitae ornare quis, iaculis ac nisl. Sed sit amet pulvinar purus. Pellentesque orci massa.
                    </SanitizedInnerHtml>
                </div>



            </section>

            <aside className="col-3">

                <h4>Adresse</h4>
                <h4>Moyen de contact</h4>


            </aside>


        </article>
    )
}


export default MainPersonView
