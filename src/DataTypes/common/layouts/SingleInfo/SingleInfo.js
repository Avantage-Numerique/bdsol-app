import {lang} from "@/common/Data/GlobalConstants";
import Tip from "@/common/FormElements/Tip/Tip";

import styles from './SingleInfo.module.scss'

/**
 *
 * @param props
 * @param props.title {string} Title of the section
 * @param props.children {JSX.Element} Content of the component when displayed
 * @param props.NAMessage {string} Sentence to display if there is no content (children)
 * @param props.className {string} Sting of classes to override the current ones one the hole section
 * @param props.classNameTitle {string} Sting of classes to override the current ones into the title element
 * @param props.tooltip {object} Contains the necessary data to display a tootip component
 * @param props.tooltip.header {string} Text of the tooltip header's content
 * @param props.tooltip.body {string} Text of the tooltip main's content
 * @param props.cardLayout {boolean} Boolean to display or not the current info with the card styling. 
 * @return {JSX.Element}
 * 
 */
const SingleInfo = props => {

    const { 
        title, 
        NAMessage, 
        className, 
        classNameTitle, 
        children, 
        tooltip, 
        cardLayout 
    } = props;

    const defaultNotAvailableMessage = NAMessage ?? (<p>{lang.noInfoAvailable}</p>);

    return (
        <div className={`${styles["single-info-container"]}`}> {/* Container with padding instead of margin to prevent "margin collapsing" */}
            <section className={`${styles["single-info-layout"]} ${cardLayout && styles["cardLayout"]}  ${className}`}>
                <header class='d-flex'>
                    <h3 className={`text-grey flex-grow-1 mb-3 ${styles["title"]} ${classNameTitle}`}>{title}</h3>
                    {tooltip && <Tip header={tooltip?.header} body={tooltip?.body}/>}
                </header>
                <div className={`${styles["single-info-layout__main"]}`}>
                    {children && children}
                    {!children && (defaultNotAvailableMessage)}
                </div>
            </section>
        </div>
    )
}
export default SingleInfo;