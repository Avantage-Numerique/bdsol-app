import React from "react"
import getConfig from 'next/config';

/***  Local styling ***/
import styles from './OrganisationSimple.module.scss'
import {lang} from "@/common/Data/GlobalConstants";
import EntitySimple from "@/DataTypes/common/layouts/EntitySimple/EntitySimple";

const OrganisationSimple = ({ data, model }) => {

    const { publicRuntimeConfig } = getConfig();

    const {
        createdAt,
        description,
        catchphrase,
        name,
        offers,
        slug,
        mainImage
    } = data;

    const type = lang.Organisation; //"Organisation";
    const defaultOrgAvatar = '/general_images/Jurassic_Park_Main_Gate.jpg';
    const mainImageAbsoluteUrl = mainImage?.src ? process.env.NEXT_PUBLIC_API_URL + mainImage.url : defaultOrgAvatar;

    return (
        <EntitySimple model={model} className={`${styles["org-simple"]}`}>
            entity simple
        </EntitySimple>
    )
}

export default OrganisationSimple