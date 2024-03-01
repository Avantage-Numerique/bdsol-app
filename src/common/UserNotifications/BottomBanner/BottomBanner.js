import {useEffect, useState} from 'react'

//components
import Button from '@/src/common/FormElements/Button/Button'

//Styling
import styles from './BottomBanner.module.scss'


export default function BottomBanner(props) {

    const {
        title,
        bannerButtons,
        children,
        Thumb,
        onCloseCallback
    } = props;

    const [displayState, setDisplayState] = useState(false);
    const [fadeOutClass, setFadeOutClass] = useState(false);
    const animationDuration = 1000;

    //Only call once
    useEffect(() => {

        //Call the function to display the element by changing the state
        setTimeout(display, animationDuration);

    }, [])


    const fadeInAction = () => {
        if(!displayState){
            setDisplayState(true);
            //Call the close function after three secondes
            setTimeout(close, animationDuration);
        }
    }

    const fadeOutAction = () => {
        if(displayState){
            //Slide out
            setFadeOutClass(true);
            //Remove the element from the dom after 1 sec (when the element is totaly out)
            setTimeout(() => {
                    setDisplayState(false);
                    onCloseCallback();
                }, animationDuration);
        }
    }

    const display = () => {
        fadeInAction();
    }

    const close = (action) => {
        fadeOutAction();
        if (action) action();//check if action is a callback.
    }

    const thumbColWidth = Thumb ? 3 : 0;
    const contentColWidth = 12 - thumbColWidth;

    return (
        <>
            {/* Only display the element if the state says it so */}
            { displayState &&
                <dialog open className={`bg-primary-lighter ${fadeOutClass && styles["close"]} ${styles["bottom-banner"]}`}>
                    <div className="container">
                        <div className={"row"}>
                            {Thumb &&
                                <div className={`col-${thumbColWidth} d-flex justify-content-center align-items-center`}>
                                    <Thumb/>
                                </div>
                            }
                            <div className={`col-${contentColWidth}`}>
                                {title && <h2>{title}</h2>}
                                {children &&
                                    <div className={`${styles["bottom-banner__text-container"]}`}>
                                        {children}
                                    </div>
                                }

                                {bannerButtons && bannerButtons.length > 0 &&
                                    <div className={`${styles["bottom-banner__buttons-container"]} d-flex`}>
                                        {bannerButtons.map((button, index) => {
                                            return (
                                                <div className={"me-2"} key={`bottomBannerButtonContainer${index}`}>
                                                    <Button key={`bottomBanner${index}`} onClick={() => close(button.action)} outline={button.outline}>{button.label}</Button>
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </dialog>
            }
        </>
    )
}
