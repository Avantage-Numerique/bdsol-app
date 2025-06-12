import Login from '@/auth/components/Forms/Login/Login'
import PageMeta from "@/src/common/PageMeta/PageMeta";
import {lang} from "@/common/Data/GlobalConstants";
import React from "react";
import styles from "@/auth/components/Forms/Login/Login.module.scss";
import Golden2Columns from "@/layouts/Templates/Golden2Columns";
import {templatesEnum} from "@/layouts/Templates/TemplatesEnum";


/**
 * To set the wrapper template within the Layout component
 * @returns {Promise<{props: {template: string}}>}
 */
export async function getStaticProps() {
    return {
        props: {
            template: templatesEnum.FULL_WIDTH
        }
    }
}

const LoginPage = () => {

    const Column = (
        <div className={"bg-primary"}>
            <Login/>
        </div>
    )

    return (
        <Golden2Columns class={`${styles.authPage}`} columnContent={Column}>
            <PageMeta 
                title={lang.compte__connexion__title}
                description={lang.compte__connexion__description}
            />
            <h1>LOGIN awesome d'AVNU 8-)</h1>
        </Golden2Columns>
    )

}

export default LoginPage;