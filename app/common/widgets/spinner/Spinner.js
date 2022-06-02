

//Styling
import styles from './Spinner.module.scss'


const Spinner = () => {

    return (
        <div className={`${styles["spinner__container"]}`}>

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