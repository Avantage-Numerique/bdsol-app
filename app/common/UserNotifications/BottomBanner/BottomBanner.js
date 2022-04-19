import { useEffect, useState } from 'react'

//Components 
import Button from '../../../common/FormElements/Buttons/Button/Button'

//Styling
import styles from './BottomBanner.module.scss'



export default function BottomBanner({title, para1, para2, buttonText}) {

    const [displayState, setDisplayState] = useState(false);
    const [fadeOutClass, setFadeOutClass] = useState(false);

    //Only call once
    useEffect(() => {

        //Call the function to display the element by changing the state
        setTimeout(display, 5000);   //5 secondes duration

    }, [])

    const display = () => {
        setDisplayState(true)
        //Call the close function after three secondes
        setTimeout(close, 5000); 
    }

    const close = () => {
        if(displayState){
            //Slide out
            setFadeOutClass(true)
            //Remove the element from the dom after 1 sec (when the element is totaly out)
            setTimeout(() => setDisplayState(false), 1000); 
        }
    }


    return (
        <>

            {/* Only display the element if the state says it so */}
            { displayState && 

                <dialog open className={`${fadeOutClass && styles.close} ${styles["bottom-banner"]}`}>
                    <div className="maxWidthPageContainer">
                        <h2 className="col-12">{title}</h2>
                        <div className={`${styles["bottom-banner__text-container"]}`}>
                            {para1 && <p className="col-12">{para1}</p>}
                            {para2 && <p className="col-12">{para2}</p>}
                        </div>
                        
                        <div className={`col-12 ${styles["bottom-banner__buttons-container"]}`}>
                            <Button onClick={close}>{buttonText}</Button>
                        </div>
                    </div>
                </dialog> 

            }
        </>
    )
}
