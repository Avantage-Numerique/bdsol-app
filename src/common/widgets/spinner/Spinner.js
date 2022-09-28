

//Styling
import styles from './Spinner.module.scss'


const Spinner = ({ fixed, reverse }) => {

    return (
        <div className={`
            ${styles["spinner__container"]}
            ${reverse ? styles["spinner__container--reverse"] : ""}
            ${fixed ? styles["spinner__container--fixed"] : ""}
        `}>

            <div className={`${styles["spinner__elem"]}`}>

                <div className={`${styles["lds-roller"]}`}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

            </div>
            
        </div>
    )
}

export default Spinner