import { useRef, useState } from "react";

import { Overlay, Popover as PopoverBS } from "react-bootstrap";

import Icon from "@/src/common/widgets/Icon/Icon";

import styles from "./Popover.module.scss";

/**
 * @typedef {Object} PopoverBSProps
 * @property {string} icon
 * @property {string?} triggerText
 * @property {string} title
 * @property {JSX.Element | string} body
 * @property {import("react-bootstrap").OverlayTriggerProps['placement']} placement
 * @property {import("react-bootstrap").OverlayTriggerProps['trigger']} trigger
 * @property {import("react-bootstrap").OverlayTriggerProps['rootClose']} rootClose
 *
 * @param {PopoverBSProps} props
 */
const Popover = ({ icon, triggerText, title, body, placement = "bottom", trigger, rootClose }) => {
    const [show, setShow] = useState(false);
    const [hold, setHold] = useState(false);

    const target = useRef();

    const superClose = () => {
        setShow(false);
        setHold(false);
    };

    const popover = (
        <PopoverBS className={`border-0 ${styles["pop-over"]}`}>
            <PopoverBS.Header as="header">
                <h4 title={title} className="m-0 me-2 fs-5 text-truncate">
                    {title}
                </h4>

                <button onClick={superClose} className="fs-5 m-0" type="button">
                    &#x2716;
                </button>
            </PopoverBS.Header>

            <div className="border-bottom w-100 my-2"></div>

            <PopoverBS.Body as="section">{body}</PopoverBS.Body>
        </PopoverBS>
    );

    const overlay = (
        <Overlay
            show={show || hold}
            target={target.current}
            placement={placement}
            rootClose={rootClose}
            onHide={rootClose ? superClose : null}
        >
            {popover}
        </Overlay>
    );

    return (
        <>
            <button
                className={`d-flex flex-row align-items-center gap-1 mx-1 ${styles["info-button"]}`}
                ref={target}
                onClick={(e) => {
                    e.stopPropagation(); // prevent triggering onHide when clicked
                    setHold(!hold);
                }}
                onMouseEnter={() => {
                    setShow(true);
                }}
                onMouseLeave={() => {
                    setShow(false);
                }}
            >
                {triggerText} <Icon iconName={icon ?? "question-circle"} className={`fs-4 ${styles["icon"]}`} />
            </button>

            {overlay}
        </>
    );
};

export default Popover;
