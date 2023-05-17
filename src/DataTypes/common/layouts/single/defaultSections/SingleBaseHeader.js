//Styles
import styles from './SingleBaseHeader.module.scss';

//Utils
import { lang } from '@/src/common/Data/GlobalConstants';

//Component
import Button from '@/src/common/FormElements/Button/Button';
import MainImageDisplay from '@/DataTypes/common/layouts/single/defaultSections/MainImageDisplay/MainImageDisplay';


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
        entity,
        title,
        subtitle,
        type
    } = props;

    return (
        <section className="row position-relative p-4 ms-0">
            <div className="col-md-6 order-2 order-md-1">
                { /* title */ }
                { title ?? <h2 className='mt-4 ms-4'>Titre</h2>}

                { /* subtitle */ }
                { subtitle ?? <h3 className='ms-4'>Sous-titre</h3> }

                { /* mainImage */ }
                <MainImageDisplay mainImage={mainImage} entity={entity} />

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