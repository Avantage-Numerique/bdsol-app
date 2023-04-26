import React from "react";

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
        addGradientOver
    } = props;

    // defaults
    className = className ?? "w-100 h-100";
    addGradientOver = addGradientOver ?? false;

    const baseSrc = `${process.env.NEXT_PUBLIC_API_URL}`;

    return (
        <figure className={className}>
            <img src={`${baseSrc}${model.url}`} alt={model.alt} className={imgClassName} />
            {
                addGradientOver &&
                <div className={`position-absolute w-100 h-100 no-pointer-events dark-transparent-gradient`}></div>
            }
        </figure>
    )
}

export default MediaFigure;