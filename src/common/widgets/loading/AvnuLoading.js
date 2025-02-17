//Styling
import styles from './AvnuLoading.module.scss'


const AvnuLoading = ({fixed, reverse}) => {

    return (
        <div className={`${styles["loader"]}`}>
            <span className={`${styles["trajet"]}`}></span>
            <div className={`${styles["engine"]}`}>
                <div className={`${styles["fire"]}`}></div>
                <div className={`${styles["rocket"]}`}></div>
            </div>
        </div>
    )
}
export default AvnuLoading
