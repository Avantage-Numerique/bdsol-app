import React from 'react'

//Styling
import styles from './tip.module.scss'
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';


const Tip = (props) => {

    const popover = (
        <Popover id={`popover-positioned-left`}>
            {props.header &&
            <Popover.Header as="h3">
                {props.header}
            </Popover.Header>
            }
            {props.body &&
            <Popover.Body>
                {props.body}
            </Popover.Body>
            }
        </Popover>
    )


    if(props.header || props.body)
    return (
        <>
            <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                <button type="button" className={`${styles["tip__toggle-button"]}`}>
                    <div>?</div>
                </button>
            </OverlayTrigger>
        </>
    )

}


export default Tip