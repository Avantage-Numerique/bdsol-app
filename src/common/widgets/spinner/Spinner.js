import styles from './Spinner.module.scss'
import AvnuLoading from "@/common/widgets/loading/AvnuLoading";


const Spinner = ({ fixed, absolute, reverse, className, label }) => {
    return (
        <div className={`
            ${styles["spinner__container"]} 
            ${className}
            ${fixed ? styles["spinner__container--fixed"] : ""}
            ${absolute ? styles["spinner__container--absolute"] : ""}
        `}>
            <AvnuLoading fixed={fixed} reverse={reverse}/>
            {label &&
                <p className="text-center pt-5"><strong>{label}</strong></p>
            }
        </div>
    )
}

export default Spinner