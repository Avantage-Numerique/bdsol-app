import React from "react"

import styles from './OrganisationSimple.module.scss'
import EntitySimple from "@/DataTypes/common/layouts/EntitySimple/EntitySimple";

const OrganisationSimple = ({ model, ...props }) => {

    return (
        <EntitySimple {...props}model={model} className={`${styles["org-simple"]}`} />
    )
}

export default OrganisationSimple