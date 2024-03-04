import React from "react"

/***  Local styling ***/
import styles from './EquipmentSimple.module.scss'
import EntitySimple from "@/DataTypes/common/layouts/EntitySimple/EntitySimple";
import {replacePathname} from "@/src/helpers/url";

const EquipmentSimple = ({ model }) => {

    const link = "/"+replacePathname(model.singleRoute.pathname, {slug: model.slug});

    const Header = (
        <div className={`d-flex flex-column justify-content-center align-items-center h-100 ${styles["equipment-simple__header"]}`}>
            <section className={`${styles["equipment-simple__header__top-section"]}`}>
                {/* Profil picture */}
                <figure className={`${styles["equipment-simple__header__picture"]}`}>
                    <a href={link} title={`${model.title}`} className={"position-absolute w-100 h-100"} target={"_self"} rel={"follow"}>
                        <img src={`${model.mainImage.baseSrc}${model.mainImage.url}`} alt={model.mainImage.alt} />
                    </a>
                </figure>
            </section>
        </div>
    );

    //Removed Header from EntitySimpleProps to show tag typeTag component from default header. 2024/03/01
    return (
        <EntitySimple model={model} className={`${styles["equipment-simple"]}`} />
    )
}

export default EquipmentSimple