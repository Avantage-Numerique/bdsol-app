//Styles
import styles from './SingleBaseHeader.module.scss';

//Utils
import { lang } from '@/src/common/Data/GlobalConstants';

//Component
import Button from '@/src/common/FormElements/Button/Button';


/**
 * 
 * @param {string} mainImage
 * @param {string} title
 * @param {string} subtitle
 * @param {string} entityType
 */

const SingleBaseHeader = (props) => {
    
    const {
        mainImage,
        title,
        subtitle,
        type
    } = props;

    const haveMainImage = mainImage !== undefined && mainImage !== "";
    const mainImageRootUrl = haveMainImage ? process.env.NEXT_PUBLIC_API_URL : "";//we dont add api path if it's local.
    const mainImageUrl = mainImage?.url ?? "/general_images/person-default.webp";
    const mainImageAlt = mainImage?.alt ?? "main image alt";


    return (
        <section className="row position-relative p-4 ms-0">
            <div className="col-md-6 order-2 order-md-1">
                { /* title */ }
                {title ?? <h2 className='mt-4 ms-4'>Titre</h2>}

                { /* subtitle */ }
                <h3 className='ms-4'>
                    { subtitle ?? "Sous-titre" }
                </h3>

                { /* mainImage */ }
                <div
                    className='d-flex flex-row justify-content-start'>
                    <figure className={`${styles["main-image-container"]}`}>
                        {haveMainImage &&
                            <a href={`/medias/${mainImage._id}`}
                                className={`fs-4 w-100 h-100 position-absolute d-flex align-items-center justify-content-center p-1 ${styles["profile-picture--modification-opt"]}`}>
                                Afficher
                            </a>
                        }
                        <img src={mainImageRootUrl + mainImageUrl} alt={mainImageAlt}/>
                    </figure>
                    <div>
                        <a href={"#"}>
                            <img src={"/icones/edit-icon.svg"} alt={"Changer l'image"}/>
                                {haveMainImage ? lang.updateImage : lang.addImage}
                        </a>
                    </div>
                </div>

            </div>
            <div className="col-md-6 order-1 order-md-2 d-flex flex-md-column align-items-end justify-content-between">
                { /* btnToggleViewEdit */ }
                <Button>Modifier/Voir</Button>
                { /* entityType */ }
                <p className='text-white mb-0'>{type ?? "Type de l'entité"}</p>

            </div>


        </section>
    )

}

export default SingleBaseHeader;