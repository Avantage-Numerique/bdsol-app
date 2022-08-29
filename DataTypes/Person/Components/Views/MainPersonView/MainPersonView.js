import React from 'react' 

//Components
import SanitizedInnerHtml from '../../../../../app/utils/SanitizedInnerHtml'

//Styling
import styles from './MainPersonView.module.scss'


const MainPersonView = ({ data }) => {

    console.log(data)

    return (
        <article className={`${styles["main-person-piew"]}`}>
            
            {/*
            *
            *  HEADER 
            * 
            */}
            <header>

                {/* Background image */}
                <figure>
                    <img src="/general_images\forestBG.jpg" alt="Background image for a person card"/>
                </figure>

                {/* Text content */}
                <div className={`${styles["headers-text"]}`}>
                    <div></div>
                    <div></div>
                    <div>                    
                        <h1>Le beau Jonathan</h1>
                    </div>

                </div>


            </header>

            {/*
            *
            *  MAIN SECTION
            * 
            */}
            <section>

                <div className={`${styles["main-section"]}`}>

                    <div className={`${styles["main-section__description"]}`}>
                        <h4>Présentation</h4>
                        <SanitizedInnerHtml>
                            texte descriptif
                        </SanitizedInnerHtml>
                    </div>

                    <div className={`${styles["main-section__line"]}`}></div>

                    <div className={`${styles["main-section__singular-infos"]}`}></div>

                </div>

            </section>


        </article>
    )
}


export default MainPersonView
