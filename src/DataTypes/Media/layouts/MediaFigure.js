import React from "react";
import styles from "./MediaFigure.module.scss";
import Link from "next/link";

/**
 *
 * @param props
 * @param props.className {string} The figure class Name.
 * @param props.imgClassName {string} Image tag className to pass.
 * @param props.model {Media} Image tag className to pass.
 * @param props.addGradientOver {boolean} To show a gradient over.
 * @param props.link {string} To redirect on click (not mandatory)
 * @param props.linkTitle {string} Text to show when cursor over the component 
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
        link,
        linkTitle
    } = props;

    // defaults
    className = className ?? "w-100 h-100";

    baseSrc = baseSrc ?? model?.baseSrc;
    baseSrc = baseSrc ?? `${process.env.NEXT_PUBLIC_API_URL}`;

    const Image = () => {
        return (
            <>
                <img src={`${baseSrc}${model.url}`} alt={model.alt} className={imgClassName} />
                {children && children}
            </>
        )
    }
    
    //get height and width dynamicaly ?
    return (
        <>
            {model &&
                <figure className={`${styles["mediaFigure"]} ${className}`}>
                    {/* If a link is added to the component, add a link tag to the image*/}
                    {props.link ? 
                        <Link href={link} title={linkTitle || ""}>
                            <Image />
                        </Link>
                        : 
                        <Image />
                    }
                    
                </figure>
            }
        </>
    )
}

export default MediaFigure;