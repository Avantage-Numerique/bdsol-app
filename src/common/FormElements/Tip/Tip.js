import { useState } from 'react';

//components
import PopOver from '@/src/common/UserNotifications/PopOver/PopOver'

//Styling
import styles from './tip.module.scss'


const Tip = (props) => {

    const [popOverDisplay, setPopOverDisplay] = useState(false);

    return (
        <div className="position-relative">
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
            <div className="position-absolute top-50 start-50">
                { popOverDisplay &&
                <PopOver 
                    {...props}
                    positionClass="left-bottom"
                    closingFunction={() => setPopOverDisplay(false)}
                />
                }
            </div>
        </div>
        
    )
}

export default Tip