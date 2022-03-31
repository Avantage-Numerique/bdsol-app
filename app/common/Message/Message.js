import { useState, useEffect } from 'react'

import styles from './Message.module.scss'




const Message = ({ children, positiveReview, clearState }) => {

    const [active, setActive] = useState(true);

    const [hideProperty, setHideProperty] = useState(false);

    const hideElement = () => {
        if(!hideProperty) setHideProperty(true);
        setTimeout(() => setActive(false), 1500)
    }

    useEffect(() => {
        setTimeout(() => {
            hideElement();
            setTimeout(() => clearState())
        }, 8000)
    }, [])

   



    return (
        <>
            {active && children &&       
                <aside className={`${styles["message-component"]} ${positiveReview && styles.positiveReview} ${!hideProperty && styles.display} ${hideProperty && styles.hide}`}>

                    <p className="beige">{children}</p>

                    <div onClick={() => { hideElement() }} className={styles.xbutton}>&#10005;</div>
                    
                </aside>
            }
        </>
    );
}

export default Message