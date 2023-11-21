/*
    Footer section at the bottom of every pages
*/
import styles from './Footer.module.scss'
import {useAuth} from "@/auth/context/auth-context";
import {appConfig} from "@/src/configs/AppConfig";
import nextConfig from "@/next.config";


const Footer = () => {

    const auth = useAuth();

    return (

        <footer id={styles.pageFooter} className="bg-primary-dark py-4">

            <div className="container position-relative">
                {/* Logo AVNU*/}
                <div className={`row justify-content-center ${styles["main-logo--container"]}`}>
                    <img alt="Logo officiel de AVNU" src="/logos-avnu/AVNU-LogoComplet-RVB.png" />
                </div>                                
                {/* Presentation of Avantage Numerique */}
                <div className={`row`}>
                    <p className="text-center mb-0">Un projet développé avec amour par</p>
                </div>
                <div className={`row justify-content-center ${styles["secondary-logo--container"]}`}>
                    <div className="d-flex justify-content-center ">
                        <a href="https://avantagenumerique.org/">
                            <img alt="Logo avantage numérique" src="/logo.svg" />
                        </a> 
                    </div>
                </div>
                {/* Utils and legal links */}
                <div className={`row d-flex flex-column`}>
                    <p className="text-center mb-0">
                        <a>Mentions légales</a> | <a href="/politique-d'utilisation-des-donnees">Politique de confidentialité</a> | <a href="termes-et-conditions-d'utilisation">Conditions générales d'utilisation</a> | <a href='/nous-joindre'>Nous joindre</a> |<a>Crédits</a>
                    </p>
                    <p className="text-center my-0"><small>Contact : Nom Prénom, adressecourriel@petittheatre.org, 112 7e rue, Rouyn-Noranda</small></p>
                </div>
                <div className={`row`}>
                    <div className={`${styles.socialMediaLogos} d-flex justify-content-center`}>    
                        <div className={`${styles.FacebookLogo} ${styles.socialMediaLogo}`} role="img" aria-label="Logo Facebook"><a href="https://www.facebook.com/avantagenumerique/"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 394.48 394.48"><path d="M394.48,197.24A197.05,197.05,0,0,1,205.09,394.33q-3.9.15-7.85.15C88.3,394.48,0,306.17,0,197.24S88.3,0,197.24,0,394.48,88.31,394.48,197.24Z" fill="#1F1F2E"/><path className={`${styles.colorTransition}`} d="M256.55,162v35.28h54.72l-7.13,55.26H256.55V385.4a196.49,196.49,0,0,1-51.46,8.93h-5.6V252.54H151.78V197.28h47.71V156.53c0-47.29,28.88-73,71.07-73a392.06,392.06,0,0,1,42.64,2.18v49.42H283.94C261,135.1,256.55,146,256.55,162Z" fill="#212121"/></svg></a></div>
                        <div className={`${styles.InstagramLogo} ${styles.socialMediaLogo}`} role="img" aria-label="Logo Instagram"><a href="https://www.instagram.com/avantagenumerique/"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 394.48 394.48"><circle cx="197.24" cy="197.24" r="197.24" fill="#1F1F2E"/><path  className={`${styles.colorTransition}`} d="M267.24,83.5h-140A43.56,43.56,0,0,0,83.5,127.25v140A43.57,43.57,0,0,0,127.24,311h140A43.58,43.58,0,0,0,311,267.24v-140A43.57,43.57,0,0,0,267.24,83.5Zm12.64,26.25h4.86v38.88H245.85V109.75ZM165.16,173.91c6.8-9.72,19.44-16.53,32.08-16.53s25.28,6.81,32.08,16.53a39.5,39.5,0,0,1,7.78,23.33,39.86,39.86,0,1,1-79.72,0A39.57,39.57,0,0,1,165.16,173.91Zm123.47,93.33a21.58,21.58,0,0,1-21.39,21.39h-140a21.57,21.57,0,0,1-21.38-21.39V173.91h34A62.7,62.7,0,0,0,135,197.24c0,34,28.2,62.22,62.22,62.22s62.22-28.19,62.22-62.22a62.46,62.46,0,0,0-4.86-23.33h34v93.33Z" fill="#212121"/></svg></a></div>
                        <div className={`${styles.YoutubeLogo} ${styles.socialMediaLogo}`} role="img" aria-label="Logo Youtube"><a href="https://www.youtube.com/channel/UCZ43sUJzg1_4CI1msKiTaLw?view_as=subscriber"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 394.48 394.48"><circle cx="197.24" cy="197.24" r="197.24" fill="#1F1F2E"/><path  className={`${styles.colorTransition}`} d="M330.65,129.78A35,35,0,0,0,306,105c-21.71-5.86-108.79-5.86-108.79-5.86s-87.07,0-108.79,5.86a35,35,0,0,0-24.62,24.77C58,151.64,58,197.24,58,197.24s0,45.6,5.81,67.46a35,35,0,0,0,24.62,24.78c21.72,5.85,108.79,5.85,108.79,5.85s87.08,0,108.79-5.85a35,35,0,0,0,24.62-24.78c5.82-21.86,5.82-67.46,5.82-67.46S336.47,151.64,330.65,129.78ZM168.76,238.64v-82.8l72.78,41.4Z" fill="#212121"/></svg></a></div>
                    </div>
                </div>
            </div>

            <div className="container-fluid position-relative">
                <div className={`row`}>
                    <div className={"col-12 pt-5"}>
                        <p className={"m-0 ps-5 opacity-25 text-right"}>
                            <small>{appConfig.name} v.{nextConfig.env.VERSION} ({auth.mode})</small>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )   
}

export default Footer;