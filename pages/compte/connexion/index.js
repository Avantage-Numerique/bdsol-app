import Login from '@/auth/components/Forms/Login/Login'
import PageMeta from "@/src/common/PageMeta/PageMeta";
import {lang} from "@/common/Data/GlobalConstants";
import React from "react";
import styles from "@/auth/components/Forms/Login/Login.module.scss";
import Golden2Columns from "@/layouts/Templates/Golden2Columns";
import {templatesEnum} from "@/layouts/Templates/TemplatesEnum";
import SearchBar from "@/common/Components/SearchBar";
import Image from "next/image";
import backgroundImg from '@/public/general_images/fusee-planetes-pointilles2-90deg.svg'

/**
 * To set the wrapper template within the Layout component
 * @returns {Promise<{props: {template: string}}>}
 */
export async function getStaticProps() {
    return {
        props: {
            template: templatesEnum.FULL_WIDTH,
            menu: {
                searchBar: false
            }
        }
    }
}

const LoginPage = () => {


//Background image for the page header
    const HeaderBgImg = () => {

        const localFigureStyling = {
            bottom: "0",
            zIndex: "0",
            right: "0"
        }

        const localImgStyling = {
            objectFit: "contain",
            objectPosition: "15% bottom"
        }

        return (
            <figure style={localFigureStyling} className="position-absolute w-38 h-100 overflow-hidden">
                <Image src={backgroundImg} style={localImgStyling} className="w-100 h-auto position-absolute start-0 bottom-0" alt="Trajet de la fusée d'Avantage Numérique" />
            </figure>
        )
    }
    //
    const Column = (
        <Login/>
    )

    // style={{backgroundImage:'url(/general_images/fusee-planetes-pointilles2-90deg.svg)'}}
    return (
        <Golden2Columns className={`${styles["login-background"]}`} columnContent={Column} contentClassName={"position-relative"} columnClassName={"bg-secondary"}>
            <HeaderBgImg />
            <PageMeta 
                title={lang.compte__connexion__title}
                description={lang.compte__connexion__description}
            />
            <div className={"row w-50 justify-content-center align-items-center"}>
                <div className={"col-3"}><img src={"/AVNU_Branding/AVNU-LogoCanard-RVB.svg"} /></div>
                <div className={"col-9"}>
                    <h1>Explorer le numérique<br/><span className={"text-secondary"}>Sur le territoire</span></h1>
                    <div className={"pt-1"}>
                        <SearchBar id="searchbar-layout-login" clearAfterSearch="true" small />
                    </div>
                </div>
            </div>
        </Golden2Columns>
    )

}

export default LoginPage;