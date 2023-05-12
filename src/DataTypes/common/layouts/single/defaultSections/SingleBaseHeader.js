//Styles
import styles from './SingleBaseHeader.module.scss';

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

    return (
        <section className="row position-relative p-4 ms-0">
            <div className="col-md-6 order-2 order-md-1">
                { /* title */ }
                <h2 className='mt-4 ms-4'>
                    {title ?? "Titre"}
                </h2>

                { /* subtitle */ }
                <h3 className='ms-4'>
                    { subtitle ?? "Sous-titre" }
                </h3>

                { /* mainImage */ }
                <figure className={`${styles["main-image-container"]}`}>
                    <img src="/general_images/person-default.webp" alt="Denis"/>
                </figure>

            </div>
            <div className="col-md-6 order-1 order-md-2 d-flex flex-md-column align-items-end justify-content-between">
                { /* btnToggleViewEdit */ }
                <Button>Modifier/Voir</Button>
                { /* entityType */ }
                { type ?? <p className='text-white mb-0'>Type de l'entité</p>}

            </div>


        </section>
    )

}

export default SingleBaseHeader;