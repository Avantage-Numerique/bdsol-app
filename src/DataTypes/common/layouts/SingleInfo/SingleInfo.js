import {lang} from "@/common/Data/GlobalConstants";
import Tip from "@/common/FormElements/Tip/Tip";

import styles from './SingleInfo.module.scss'

const SingleInfo = ({ title, NAMessage, className, classNameTitle, children, tooltip }) => {

    const defaultNotAvailableMessage = NAMessage ?? (<p>{lang.noInfoAvailable}</p>);

    return (
        <section className={`${styles["single-info-layout"]} ${className}`}>
            <header>
                <h3 className={`text-grey ${styles["title"]} ${classNameTitle}`}>{title}</h3>
                {tooltip && <Tip header={tooltip?.header} body={tooltip?.body}/>}
            </header>
            <div className={`${styles["single-info-layout__main"]}`}>
                {children && children}
                {!children && (defaultNotAvailableMessage)}
            </div>
        </section>
    )
}
export default SingleInfo;