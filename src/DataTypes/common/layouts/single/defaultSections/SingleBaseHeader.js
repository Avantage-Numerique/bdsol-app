//Styles
import styles from './SingleBaseHeader.module.scss';

//Component
import Button from '@/src/common/FormElements/Button/Button';
import MainImageDisplay from '@/DataTypes/common/layouts/single/defaultSections/MainImageDisplay/MainImageDisplay';


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
 */

const SingleBaseHeader = (props) => {

    const {
        mainImage,
        entity,
        title,
        subtitle,
        type,
        className,
        buttonSection,
        buttonText,
        buttonLink
    } = props;

    return (
        <section className={`row position-relative p-4 ms-0 ${className}`}>
            <div className="col-md-6 order-2 order-md-1">
                { /* title */ }
                { title ?? <h2 className='mt-4 ms-4'>Titre</h2>}

                { /* subtitle */ }
                { subtitle ?? <h3 className='ms-4'>Sous-titre</h3> }

                { /* mainImage */ }
                <MainImageDisplay mainImage={mainImage ?? undefined} entity={entity} />
            </div>
            <div className="col-md-6 order-1 order-md-2 d-flex flex-md-column align-items-end justify-content-between">
                { /* btnToggleViewEdit */ }
                {/* If a button section is declared, use it */}
                {buttonSection && buttonSection}
                {/* If the is no button section and there is a single button declared, display it */}
                {buttonText && buttonLink && <Button href={buttonLink}>{buttonText}</Button>}
                { /* entityType */ }
                <p className='text-white mb-0'>{type ?? "Type de l'entité"}</p>
            </div>
        </section>
    )

}

export default SingleBaseHeader;