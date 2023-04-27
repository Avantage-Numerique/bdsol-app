import React from "react";
import styles from "./MediaFigure.module.scss";

/**
 *
 * @param props
 * @param props.className {string} The figure class Name.
 * @param props.imgClassName {string} Image tag className to pass.
 * @param props.model {Media} Image tag className to pass.
 * @param props.addGradientOver {boolean} To show a gradient over.
 * @return {JSX.Element}
 * @constructor
 */
const MediaFigure = (props) => {

    let {
        className,
        imgClassName,
        model,
        children,
        baseSrc,
    } = props;

    // defaults
    className = className ?? "w-100 h-100";

    baseSrc = baseSrc ?? model.baseSrc;
    baseSrc = baseSrc ?? `${process.env.NEXT_PUBLIC_API_URL}`;

    return (
        <figure className={`${styles["mediaFigure"]} ${className}`}>
            <img src={`${baseSrc}${model.url}`} alt={model.alt} className={imgClassName} />
            {children && children}
        </figure>
    )
}

export default MediaFigure;