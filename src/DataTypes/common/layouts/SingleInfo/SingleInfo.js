import styles from "./SingleInfo.module.scss";
import { useFieldTips } from "@/src/hooks/useFieldTips/useFieldTips";
import Icon from "@/src/common/widgets/Icon/Icon";

/**
 * @typedef {Object} SingleInfoProps
 *
 * @property {string} title Title of the section
 * @property {JSX.Element} children Content of the component when displayed
 * @property {string} NAMessage Sentence to display if there is no content (children)
 * @property {JSX.Element} NAComponent Element to display if there is no content (children)
 * @property {string} className Sting of classes to override the current ones one the hole section
 * @property {string} classNameTitle Sting of classes to override the current ones into the title element
 * @property {Object} tooltip Contains the necessary data to display a tootip component
 * @property {string} tooltip.header Text of the tooltip header's content
 * @property {string} tooltip.body Text of the tooltip main's content
 * @property {boolean} noCardLayout Boolean  not display the current info with the card styling. (Change because better to default to cardLayout than not)
 * @property {boolean} isSubtitle Boolean to display as a title of a subtitle
 * @property {boolean} displayCondition Boolean that tell the component to display or not the children. This is for element that would be displayed but the children prop would still be considered true
 *
 * @property {boolean | IsCollapsibleOptions} isCollapsible
 */

/**
 * @typedef {Object} IsCollapsibleOptions
 *
 * @property {string} keyId
 * @property {string} btnIconOpened
 * @property {string} btnIconClosed
 * @property {boolean} show
 */

/**
 * Displays a single info about an entity
 *
 * @param {SingleInfoProps} props
 *
 * @return {JSX.Element}
 */
const SingleInfo = (props) => {
    const {
        title,
        NAMessage,
        NAComponent,
        className,
        classNameTitle,
        children,
        tooltip,
        noCardLayout,
        displayCondition = true,
        isSubtitle = false,
    } = props;

    const { TipPopOver, TipButton } = useFieldTips(props.tooltip);

    //Set the title Tag
    const TitleTag = isSubtitle ? "h3" : "h2";
    const titleClass = isSubtitle ? "mb-1 text-dark-light" : "fs-3 mb-3";
    //Is the info filled
    const isFilled = children && displayCondition;
    //Is there default data
    const defaultDisplay = !!(NAMessage || NAComponent);
    //Prevent the display if nothing to show
    if (!isFilled && !defaultDisplay) return <></>;

    const DefaultNotAvailableDisplay = () => {
        return (
            <div className={`d-flex flex-column`}>
                {NAMessage && <p>{NAMessage}</p>}
                <div></div>
                {NAComponent && <div className={`${styles["default-component--display"]}`}>{NAComponent}</div>}
            </div>
        );
    };

    return (
        <div className={`${styles["single-info-container"]} ${isSubtitle && "py-2"}`}>
            {" "}
            {/* Container with padding instead of margin to prevent "margin collapsing" */}
            <section
                className={`${styles["single-info-layout"]} ${!noCardLayout ? styles["cardLayout"] : ""} ${!isFilled && styles["cardLayout--NA-border"]}  ${className}`}
            >
                {(title || tooltip) && (
                    <header className="d-flex">
                        <TitleTag
                            className={`text-dark flex-grow-1 ${titleClass} ${isSubtitle ? styles["subtitle"] : styles["title"]} ${classNameTitle}`}
                        >
                            {title}
                        </TitleTag>
                        {tooltip && <TipButton title="Besoin de précisions ?" />}
                    </header>
                )}

                <TipPopOver />

                <div>
                    {isFilled ? children : null}
                    {!isFilled && <DefaultNotAvailableDisplay />}
                </div>
            </section>
        </div>
    );
};
export default SingleInfo;
