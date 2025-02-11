import styles from './Spinner.module.scss'
import AvnuLoading from "@/common/widgets/loading/AvnuLoading";


const Spinner = ({ fixed, reverse, className }) => {
    return (
        <div className={`${styles["spinner__container"]} ${className}`}>
            <AvnuLoading fixed={fixed} reverse={reverse} />
        </div>
    )
}

export default Spinner