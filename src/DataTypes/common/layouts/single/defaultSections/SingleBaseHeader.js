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
    //Removed from coloumn, it's more useful to use the justify or align from start or end.
    return (
        <section className={`row position-relative p-4 ms-0 ${className}`}>
            <div className="col-md-6 d-flex flex-column order-2 order-md-1">
                { /* title */ }
                { title ?? <h2 className='mt-4 ms-4'>{lang.title}</h2> }

                { /* subtitle */ }
                { subtitle ?? <h3 className='ms-4'>{lang.subTitle}</h3> }

                <MediaFigure model={mainImage} className={"main-image-container"} imgClassName={"main-image"}>
                    { mainImage && mainImage.url !== "" && !mainImage.isDefault &&
                        <a href={`/medias/${mainImage._id}`}
                           className={`fs-4 w-100 h-100 position-absolute d-flex align-items-center justify-content-center p-1 ${styles["profile-picture--modification-opt"]}`}>
                            {lang.see}
                        </a>
                    }
                </MediaFigure>
            </div>
            <div className="col-md-6 order-1 order-md-2 d-flex flex-md-column align-items-end justify-content-between">
                { /* btnToggleViewEdit */ }
                {/* If a button section is declared, use it */}
                {buttonSection && buttonSection}
                {/* If the is no button section and there is a single button declared, display it */}
                {
                    buttonText && buttonLink ?
                    (auth.user.isLoggedIn ?
                        <Button href={buttonLink}>{buttonText}</Button>
                        :
                        <Button href="/compte/connexion">{buttonText}</Button>)
                    :
                    <></>
                }
                { /* entityType */ }
                <p className='text-white mb-0'>{type.label}</p>
            </div>
            {children &&
                <div className="col-12">
                    {children}
                </div>
            }
        </section>
    )

}

export default SingleBaseHeader;