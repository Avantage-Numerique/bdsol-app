import React from "react"
import styles from './ProjectSimple.module.scss';
import EntitySimple from "@/DataTypes/common/layouts/EntitySimple/EntitySimple";

const ProjectSimple = ({ model }) => {

    return (
        <EntitySimple model={model} className={`${styles["project-simple"]}`} />
    )
}

export default ProjectSimple;