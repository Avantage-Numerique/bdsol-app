import {useEffect, useState} from 'react'

import styles from './Message.module.scss'


const Message = ({ children, positiveReview, clean }) => {

    /*
        children : contains the main message to be displayed
        positiveReview : contains the type of message : positive of negative (bool)
        clean : function to be called if defined to clean the state of the component who called the message when it must be removed
    */
    const [active, setActive] = useState(true);
    const [hideProperty, setHideProperty] = useState(false);

    const hideElement = () => {
        if(!hideProperty) setHideProperty(true);
        setTimeout(
            () => {
                setActive(false)
                clean();
            }, 
        1000)
        //The one second correspond to the duration of the transition of the animation in the scss file.
    }

    useEffect(() => {
        setTimeout(() => {
            hideElement();
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