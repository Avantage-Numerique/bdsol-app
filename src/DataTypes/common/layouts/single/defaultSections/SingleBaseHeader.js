//Styles
import styles from './SingleBaseHeader.module.scss';
import {getType, TYPE_DEFAULT} from '@/src/DataTypes/Entity/Types';

//Component
import Button from '@/src/common/FormElements/Button/Button';
import MediaFigure from "@/DataTypes/Media/layouts/MediaFigure";

//Auth
import {useAuth} from '@/src/authentification/context/auth-context';
import {lang} from "@/common/Data/GlobalConstants";
import React from "react";
import Icon from "@/common/widgets/Icon/Icon";


/**
 * @param {object} mainImage mainImage data object
 * @param {object} entity used for mainImageForm
 * @param {JSX} title JSX element containing title (top left)
 * @param {JSX} subtitle JSX element containing subtitle (top left)
 * @param {string} entityType type that shows bottom right
 * @param {className} global classes passed from the outside
 * @param {JSX} buttonSection JSX element containing all the calls to action components in one place
 * @param {String} buttonText string : Text dispayed in the cta button in the header
 * @param {String} buttonLink string : link to redirect the user when the button is clicked
 * @param {String} editableImg bool : Show the button to edit image or not
 */
const SingleBaseHeader = (props) => {

    const {
        mainImage,
        entity,
        title,
        subtitle,
        className,
        buttonSection,
        buttonText,
        buttonLink,
        editableImg,
        children
    } = props;

    const auth = useAuth();
    const type = getType(entity.type) ?? getType(TYPE_DEFAULT);
    const isUpdateMode = className?.includes("mode-update");

    const MainImage = () => (
        <>
            { mainImage && mainImage.url !== "" && !mainImage.isDefault &&
                <a href={`/medias/${mainImage._id}`}
                    className={`fs-4 w-100 h-100 position-absolute d-flex align-items-center justify-content-center p-1 ${styles["profile-picture--modification-opt"]} main-image-link`}>
                    <Icon iconName={"eye"} /> {lang.see}
                </a>
            }
        </>
    )

    //Removed from coloumn, it's more useful to use the justify or align from start or end.
    return (
        <section className={`row ms-0  ${styles["content-padding-top"]} ${props.className}`}>
            <div className="col-12 col-sm d-flex flex-grow-0 align-items-end">
                {/* Base styling doesn't move down the picture since its not overflowing the container. A bit tricky with bootstrap grid so we need two components to apply different classes */}
                {/* Base format (small screens) */}
                <MediaFigure model={mainImage} className={`d-sm-none main-image-container no-bottom-margin ${!mainImage.isDefault ? "overflow-hidden shadow" : (styles["default-drop-shadow"] + " default-img ")}`} imgClassName={"main-image"}>
                    <MainImage />
                </MediaFigure>
                {/* SM format and more */}
                <MediaFigure model={mainImage} className={`d-none d-sm-block main-image-container ${!mainImage.isDefault ? "overflow-hidden shadow" : (styles["default-drop-shadow"] + " default-img ")}`} imgClassName={"main-image"}>
                    <MainImage />
                </MediaFigure>
            </div>
            <div className="col-12 col-sm flex-grow-1 d-flex flex-column">
                <div className="d-flex flex-column text-dark">
                    { /* title */ }
                    { title || <h1 className='mt-4 ms-4'>{lang.title}</h1> }
                    { /* subtitle */ }
                    { subtitle || <h3 className='ms-4'>{lang.subTitle}</h3> }
                    { /* Buttons when small screen */}
                    <div class="d-sm-none mt-2">
                        {buttonSection && buttonSection}
                    </div>
                </div>
                { /* btnToggleViewEdit */ }
                {/* If a button section is declared, use it */}
                <div style={{height: "1rem"}} className="position-relative flex-grow-1 d-flex align-items-end">
                    <div className={`${styles["over-flowing-button-section"]} ${isUpdateMode && styles["edition-mode"]} d-flex justify-content-evenly w-100`}>
                        {/* Empty div to allow the button to take the second third of the width */}
                        <div></div>
                        <div class="d-none d-sm-block">
                            {buttonSection && buttonSection}
                        </div>
                        {/* If the is no button section and there is a single button declared, display it */}
                        {!buttonSection && buttonText && buttonLink ?
                            (auth.user.isLoggedIn ?
                                <Button className={`shadow`} href={buttonLink}>{buttonText}</Button>
                                :
                                <Button className={`shadow`} href="/compte/connexion">{buttonText}</Button>)
                            :
                            <></>
                        }
                    </div>
                </div>
            </div>
            {children &&
                <div className="col-12 order-3 pt-2">
                    {children}
                </div>
            }
        </section>
    )

}

export default SingleBaseHeader;