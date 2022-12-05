import React from 'react'

//Styling
import styles from './tip.module.scss'


const Tip = (props) => {

    return (
        <>
            <button type="button"
                    data-bs-toggle="popover"
                    className={`${styles["tip__toggle-button"]}`}
                    data-bs-title={props.header && props.header}
                    data-bs-content={props.body && props.body}
            >
                <div>?</div>
            </button>
        </>
    )
}

export default Tip