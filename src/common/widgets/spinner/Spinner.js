import styles from './Spinner.module.scss'
import AvnuLoading from "@/common/widgets/loading/AvnuLoading";


const Spinner = ({ fixed, reverse, className, label }) => {
    return (
        <div className={`${styles["spinner__container"]} ${className}`}>
            <AvnuLoading fixed={fixed} reverse={reverse}/>
            {label &&
                <p className="text-center"><strong>label</strong></p>
            }
        </div>
    )
}

export default Spinner