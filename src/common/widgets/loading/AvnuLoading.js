//Styling
import styles from './AvnuLoading.module.scss'


const AvnuLoading = ({fixed, reverse}) => {

    return (
        <div className={`${styles["loader"]}`}>
            <span className={`${styles["trajet"]}`}></span>
            <div class={`${styles["engine"]}`}>
                <div class={`${styles["fire"]}`}></div>
                <div class={`${styles["rocket"]}`}></div>
            </div>
        </div>
    )
}
export default AvnuLoading
