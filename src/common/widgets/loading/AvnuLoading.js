//Styling
import styles from './AvnuLoading.module.scss'


const AvnuLoading = ({fixed, reverse}) => {

    const fixedClasses = fixed ? "" : "";
    const reversedClasses = reverse ? "" : "";

    return (
        <div className={`${styles["loader"]} ${fixedClasses} ${reversedClasses}`}>
            <span className={`${styles["trajet"]}`}></span>
            <div className={`${styles["engine"]}`}>
                <div className={`${styles["fire"]}`}></div>
                <div className={`${styles["rocket"]}`}></div>
            </div>
        </div>
    )
}
export default AvnuLoading
