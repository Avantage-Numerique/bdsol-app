import React, {useState} from 'react';

//components
import PopOver from '@/src/common/UserNotifications/PopOver/PopOver'

//Styling
import styles from './tip.module.scss'


const Tip = (props) => {

    const [popOverDisplay, setPopOverDisplay] = useState(false);
    const dontBasePositionOnButton = props.dontBasePositionOnButton === true;

    return (
        <>
            <div className={`${dontBasePositionOnButton ? "" : "position-relative"}`}>
                <button type="button"
                        /* data-bs-toggle="popover" */
                        onClick={() => setPopOverDisplay(prev => !prev)}
                        className={`
                            ${styles["tip__toggle-button"]}
                            d-flex
                            justify-content-center
                            align-items-center
                        `}
                        data-bs-title={props.header && props.header}
                        data-bs-content={props.body && props.body}
                >
                    <div>?</div>
                </button>
                {/* Container of the pop-over gives an initial position centered with the button */}
                {popOverDisplay &&
                        <PopOver 
                            {...props}
                            positionClass="under-center"
                            closingFunction={() => setPopOverDisplay(false)}
                        />
                }
            </div> 
        </>
        
    )
}

export default Tip

