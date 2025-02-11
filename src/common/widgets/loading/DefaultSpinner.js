//Styling
import styles from './DefaultSpinner.module.scss';


const DefaultSpinner = ({ fixed, reverse }) => {

    return (
        <div
            data-testid="spinner"
            className={`
                ${styles["spinner__container"]}
                ${reverse ? styles["spinner__container--reverse"] : ""}
                ${fixed ? styles["spinner__container--fixed"] : ""}
            `}
        >
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

export default DefaultSpinner