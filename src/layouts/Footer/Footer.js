/*
    Footer section at the bottom of every pages
*/
import styles from './Footer.module.scss'
import {now} from "@/common/Data/GlobalConstants";


const Footer = () => {

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (

        <footer id={styles.pageFooter} className="bg-dark">
            <div className="container">
                <div className={`row ${styles.separatorLine}`}>
                    <div className="col">
                        {/*Project partners section*/}
                        <section>
                            {/* Section with partners logos */}

                            {/******  This section needs to be filled with the good logos *****/}
                            <h3>Nos partenaires</h3>
                            <ul className={`${styles.partnersLogos}`}>
                                <li>
                                    <a href="https://ccat.qc.ca/"><img alt="Logo du conseil de la culture de l'Abitibi-Témiscamingue" src="/Conseil-de-la-culture-de-lAbitibi-Témiscamingue_logo.svg"/></a>
                                </li>
                                <li>
                                    <a href="https://www.uqat.ca/"><img alt="Logo de l'Université du Québec en Abitibi-Témiscamingue - UQAT" src="/UQAT_logo_NB.svg"/></a>
                                </li>
                                <li>
                                    <a href="https://www.petittheatre.org/"><img alt="Logo du Petit Théâtre du Vieux Noranda" src="/Le-Petit-Théâtre_logo.svg"/></a>
                                </li>
                                <li>
                                    <a href="https://avantagenumerique.org/"><img alt="Logo de l'Administration régionale Baie-James" src="/arbj_logo_BLANC_logo.png"/></a>
                                </li>
                            </ul>
                        </section>
                    </div>
                    <div className="col text-end">
                        <section>
                            <h3>Suivez nous</h3>
                            <ul className={`${styles.socialMediaLogos}`}>
                                {/* Section with social medias logos */}
                                <li className={`${styles.FacebookLogo} ${styles.socialMediaLogo}`} role="img" aria-label="Logo Facebook"><a href="https://www.facebook.com/avantagenumerique/"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 394.48 394.48"><path d="M394.48,197.24A197.05,197.05,0,0,1,205.09,394.33q-3.9.15-7.85.15C88.3,394.48,0,306.17,0,197.24S88.3,0,197.24,0,394.48,88.31,394.48,197.24Z" fill="#fff"/><path className={`${styles.colorTransition}`} d="M256.55,162v35.28h54.72l-7.13,55.26H256.55V385.4a196.49,196.49,0,0,1-51.46,8.93h-5.6V252.54H151.78V197.28h47.71V156.53c0-47.29,28.88-73,71.07-73a392.06,392.06,0,0,1,42.64,2.18v49.42H283.94C261,135.1,256.55,146,256.55,162Z" fill="#212121"/></svg></a></li>
                                <li className={`${styles.InstagramLogo} ${styles.socialMediaLogo}`} role="img" aria-label="Logo Instagram"><a href="https://www.instagram.com/avantagenumerique/"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 394.48 394.48"><circle cx="197.24" cy="197.24" r="197.24" fill="#fff"/><path  className={`${styles.colorTransition}`} d="M267.24,83.5h-140A43.56,43.56,0,0,0,83.5,127.25v140A43.57,43.57,0,0,0,127.24,311h140A43.58,43.58,0,0,0,311,267.24v-140A43.57,43.57,0,0,0,267.24,83.5Zm12.64,26.25h4.86v38.88H245.85V109.75ZM165.16,173.91c6.8-9.72,19.44-16.53,32.08-16.53s25.28,6.81,32.08,16.53a39.5,39.5,0,0,1,7.78,23.33,39.86,39.86,0,1,1-79.72,0A39.57,39.57,0,0,1,165.16,173.91Zm123.47,93.33a21.58,21.58,0,0,1-21.39,21.39h-140a21.57,21.57,0,0,1-21.38-21.39V173.91h34A62.7,62.7,0,0,0,135,197.24c0,34,28.2,62.22,62.22,62.22s62.22-28.19,62.22-62.22a62.46,62.46,0,0,0-4.86-23.33h34v93.33Z" fill="#212121"/></svg></a></li>
                                <li className={`${styles.YoutubeLogo} ${styles.socialMediaLogo}`} role="img" aria-label="Logo Youtube"><a href="https://www.youtube.com/channel/UCZ43sUJzg1_4CI1msKiTaLw?view_as=subscriber"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 394.48 394.48"><circle cx="197.24" cy="197.24" r="197.24" fill="#fff"/><path  className={`${styles.colorTransition}`} d="M330.65,129.78A35,35,0,0,0,306,105c-21.71-5.86-108.79-5.86-108.79-5.86s-87.07,0-108.79,5.86a35,35,0,0,0-24.62,24.77C58,151.64,58,197.24,58,197.24s0,45.6,5.81,67.46a35,35,0,0,0,24.62,24.78c21.72,5.85,108.79,5.85,108.79,5.85s87.08,0,108.79-5.85a35,35,0,0,0,24.62-24.78c5.82-21.86,5.82-67.46,5.82-67.46S336.47,151.64,330.65,129.78ZM168.76,238.64v-82.8l72.78,41.4Z" fill="#212121"/></svg></a></li>
                            </ul>
                        </section>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {/* 
                        *
                            Logo section
                        *
                        */}
                        <section className={`${styles.footerFooter}`}>
                            {/* Logo and credit mention */}
                            <small>
                                <a href="https://avantagenumerique.org/">
                                    <img alt="Logo avantage numérique" src="/logo.svg" />
                                </a> 
                                <span className={styles.creditYear}>&copy; {now.getFullYear()}</span>
                            </small>
                            
                            {/* BUtton to scroll to the top */}
                            <button className={`${styles.goPageTop}`} onClick={topFunction}>Haut <img alt="Arrow image" src="/arrow_top.svg"/></button>
                        </section>
                    </div>
                </div>
            </div>
        </footer>
    )   
}

export default Footer;