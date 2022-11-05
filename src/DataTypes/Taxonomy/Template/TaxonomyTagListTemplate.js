//Component
import styles from "./TaxonomyTagListTemplate.module.scss"


const TaxonomyTagListTemplate = (props) => {

    return (
        <ul className={`${styles['tagList']}`}>

            {props.entity.length > 0 && props.entity.map( (selected, index) =>
                <li 
                    key={index + '-tagItem-' + props.name}
                    className={`${styles['tag']} ${props.tag ? styles[props.tag] : styles["generaltag"]}`} 
                >
                    <button className={`${styles['closeButton']}`} type="button" onClick={ () => props.removeEntity(selected)}>✖</button>
                    <span className={`${styles['status'] && styles[selected.status.state]}`}>◉</span>
                    <span>{selected[props.searchField]}</span>
                </li>
            )}

        </ul>
    )
}
export default TaxonomyTagListTemplate;