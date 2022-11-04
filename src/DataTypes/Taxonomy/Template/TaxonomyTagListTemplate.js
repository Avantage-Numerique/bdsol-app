//Component
import styles from "./TaxonomyTagListTemplate"


const TaxonomyTagListTemplate = (props) => {

    TaxonomyTagListTemplate.template = "TaxonomyTagList";

    return (
        <ul className={`${styles['tagList']}`}>

            {props.entity.length > 0 && props.entity.map( (selected, index) =>
                <li 
                    key={index + '-tagItem-' + props.name}
                    className={`${styles['tag']} ${props.tag ? styles[props.tag] : styles["generaltag"]}`} 
                >
                    <button className={`${styles['closeButton']}`} type="button" onClick={ () => props.removeEntity(selected)}>&#x271A;</button>
                    <span className={`${styles['status']}`}>■</span>
                    <span>{selected[props.searchField]}</span>
                </li>
            )}

        </ul>
    )
}
export default TaxonomyTagListTemplate;