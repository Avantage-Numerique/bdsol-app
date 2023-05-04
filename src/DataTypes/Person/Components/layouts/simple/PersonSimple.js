import React from "react"

/***  Local styling ***/
import styles from './PersonSimple.module.scss'
import EntitySimple from "@/DataTypes/common/layouts/EntitySimple/EntitySimple";
import {replacePathname} from "@/src/helpers/url";

const PersonSimple = ({ model }) => {

    const link = "/"+replacePathname(model.singleRoute.pathname, {slug: model.slug});

    const Header = (
        <header className={`d-flex flex-column ${styles["person-simple__header"]}`}>
            <section className={`d-flex justify-content-center ${styles["person-simple__header__top-section"]}`}>
                {/* Profil picture */}
                <figure className={`${styles["person-simple__header__picture"]}`}>
                    <a href={link} title={`${model.title}`} className={"position-absolute w-100 h-100"} target={"_self"} rel={"follow"}>
                        <img src={`${model.mainImage.baseSrc}${model.mainImage.url}`} alt={model.mainImage.alt} />
                    </a>
                </figure>
            </section>
        </header>
    );

    return (
        <EntitySimple model={model} className={`${styles["person-simple"]}`} Header={Header} />
    )
}

export default PersonSimple