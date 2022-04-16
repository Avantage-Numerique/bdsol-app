

//Styling
import styles from './FixedCard.module.scss'

const FixedCard = ({children}) => {

    return (
        <article className={`${styles["fixed-card"]}`}>
            {children}
        </article>
    )
}

export default FixedCard