/*

    Footer section at the bottom of every pages
    V.P.R - created: 19/09/2021

*/
import footerStyles from '../styles/components/Footer.module.scss'

const Footer = ( {children} ) => {

    return (
        <footer id={footerStyles.pageFooter}>
            <h4>Ceci est un pied de page</h4>
        </footer>
    )   
}

export default Footer;