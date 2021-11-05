/*

    Footer section at the bottom of every pages
    V.P.R - created: 19/09/2021

*/
import footerStyles from '../styles/components/Footer.module.scss'

const Footer = () => {

    return (

        <footer id={footerStyles.pageFooter} className="dark_BG">
            {/* center the contain of the page */}
            <div className="maxWidthPageContainer">

                {/* 
                *
                    News letter section 
                *
                */}
                <section className={"col-12"}>
                    <div className={"col-6"}>
                        <h2 className={"col-12"}>Abonnez-vous à notre infolettre</h2>
                        <p className={"col-12"}>Restez au courant de tous les projets d'Avantage Numérique en vous abonnant à notre infolettre.</p>
                    </div>
                    <div className={"col-6"}>
                        <form className={"col-12"}>
                            <input placeholder="Courriel" />
                            <input type="submit"/>
                        </form> 
                    </div>
                </section >

                {/* 
                *
                    Project partners section
                *
                */}
                <section className={"col-12"}>

                    <h2 className={"col-12"}>Nos partenaires</h2>

                    <h2 className={"col-12"}>Suivez nous</h2>


                </section>

                {/* 
                *
                    Logo section
                *
                */}
                <section className={"col-12"}>
                    <small>&copy; <a href="https://avantagenumerique.org/">Avantage Numérique</a> - 2021</small>

                </section>


            </div>
        </footer>
    )   
}

export default Footer;