import {lang} from "@/common/Data/GlobalConstants";
import Tip from "@/common/FormElements/Tip/Tip";

import styles from './SingleInfo.module.scss'

/**
 *
 * @param props
 * @param props.title {string} Title of the section
 * @param props.children {JSX.Element} Content of the component when displayed
 * @param props.NAMessage {string} Sentence to display if there is no content (children)
 * @param props.NAComponent {JSX.Element} Element to display if there is no content (children)
 * @param props.className {string} Sting of classes to override the current ones one the hole section
 * @param props.classNameTitle {string} Sting of classes to override the current ones into the title element
 * @param props.tooltip {object} Contains the necessary data to display a tootip component
 * @param props.tooltip.header {string} Text of the tooltip header's content
 * @param props.tooltip.body {string} Text of the tooltip main's content
 * @param props.cardLayout {boolean} Boolean to display or not the current info with the card styling. 
 * @param props.displayCondition {boolean} Boolean that tell the component to display or not the children. This is for element that would be displayed but the children prop would still be considered true 
 * @return {JSX.Element}
 * 
 */
const SingleInfo = props => {

    const { 
        title, 
        NAMessage, 
        NAComponent,
        className, 
        classNameTitle, 
        children, 
        tooltip, 
        cardLayout,
        displayCondition = true
    } = props;

    //Is the info filled
    const isFilled = children && displayCondition ? true : false;
    //Is there default data
    const defaultDisplay = NAMessage || NAComponent ? true : false;
    //Prevent the display if nothing to show
    if(!isFilled && !defaultDisplay)
        return (<></>)

    const DefaultNotAvailableDisplay = () => {
        return (
            <div className={`d-flex flex-column`}>
                {NAMessage && <p>{NAMessage}</p>}
                <div></div>
                {NAComponent && 
                    <div className={`${styles["default-component--display"]}`}>
                        {NAComponent}
                    </div>
                }
            </div>
        )
    }

    return (
        <div className={`${styles["single-info-container"]}`}> {/* Container with padding instead of margin to prevent "margin collapsing" */}
            <section className={`${styles["single-info-layout"]} ${cardLayout && styles["cardLayout"]} ${!isFilled && styles["cardLayout--NA-border"]}  ${className}`}>
                <header class='d-flex'>
                    <h3 className={`text-grey flex-grow-1 mb-3 ${styles["title"]} ${classNameTitle}`}>{title}</h3>
                    {tooltip && <Tip header={tooltip?.header} body={tooltip?.body}/>}
                </header>
                <div>
                    {children && children}
                    {!children && <DefaultNotAvailableDisplay />}
                </div>
            </section>
        </div>
    )
}
export default SingleInfo;