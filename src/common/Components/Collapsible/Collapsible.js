import { Children, useState } from "react";

import styles from "./Collapsible.module.scss";

import Icon from "@/src/common/widgets/Icon/Icon";
import SingleInfo from "@/src/DataTypes/common/layouts/SingleInfo/SingleInfo";
import { DefaultNotAvailableDisplay } from "@/src/DataTypes/common/layouts/SingleInfo/DefaultNotAvailableDisplay";

/**
 * @typedef {Object} CollapsibleProps
 *
 * @property {string} NAMessage Sentence to display if there is no content (children)
 * @property {JSX.Element} NAComponent Element to display if there is no content (children)
 * @property {boolean} displayCondition Boolean that tell the component to display or not the children. This is for element that would be displayed but the children prop would still be considered true
 * @property {boolean} show Wether to show the content by default (true by default)
 * @property {boolean} outline show outline only for button (false by default)
 *
 * @property {JSX.Element} children Content of the component when displayed
 *
 * @return {JSX.Element}
 */

/**
 * Composant repliable
 *
 * @param {CollapsibleProps} props
 *
 * @return {JSX.Element}
 */
export const Collapsible = (props) => {
    const {
        NAMessage,
        NAComponent,
        keyId,
        btnIconOpened = "chevron-down",
        btnIconClosed = "chevron-right",
        show,
        displayCondition = true,
        label,
        children,
        outline,
    } = props;

    const isExpanded = show === true ? "true" : "false";
    // const label = btnLabel ? btnLabel : "";
    const [showContent, setShowContent] = useState(show);

    const onCollapseClick = () => {
        setShowContent(!showContent);
    };

    //Is the info filled
    const isFilled = children && Children.toArray(children).filter((c) => c).length && displayCondition;

    //Is there default data
    const defaultDisplay = !!(NAMessage || NAComponent);
    //Prevent the display if nothing to show
    if (!isFilled && !defaultDisplay) return <></>;

    return (
        <SingleInfo {...props}>
            {isFilled ? (
                <>
                    <button
                        className={`btn ${outline ? "btn-outline-secondary" : "btn-secondary"} btn-sm small`}
                        type="button"
                        data-toggle="collapse"
                        data-target={`#${keyId}`}
                        aria-expanded={isExpanded}
                        aria-controls={`${keyId}`}
                        onClick={onCollapseClick}
                    >
                        {label ? <>{label}&nbsp;</> : null}
                        <Icon iconName={showContent ? btnIconOpened : btnIconClosed} />
                    </button>
                </>
            ) : (
                <DefaultNotAvailableDisplay NAMessage={NAMessage} NAComponent={NAComponent} />
            )}

            <div className={`mt-4 collapse ${showContent ? "show" : ""}`} id={`${keyId}`} style={{ zIndex: "1" }}>
                <div className="d-flex flex-column gap-4">
                    {isFilled && children}
                    {!isFilled && <DefaultNotAvailableDisplay NAMessage={NAMessage} NAComponent={NAComponent} />}
                </div>
            </div>

            {!showContent && <span className={`${styles["collapsible-overlay"]}`}></span>}
        </SingleInfo>
    );
};
