/*

    Footer section at the bottom of every pages
    V.P.R - created: 19/09/2021

*/
import footerStyles from '../styles/components/Footer.module.scss'

const Footer = () => {

    return (

        <footer id={footerStyles.pageFooter}>
            <div className="maxWidthPageContainer">

                <small>&copy; <a href="https://avantagenumerique.org/">Avantage Numérique</a> - 2021</small>

            </div>
        </footer>
    )   
}

export default Footer;