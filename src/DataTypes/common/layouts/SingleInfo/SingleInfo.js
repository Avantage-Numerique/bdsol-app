import {lang} from "@/common/Data/GlobalConstants";
import Tip from "@/src/common/FormElements/Tip/Tip";

const SingleInfo = ({ title, NAMessage, className, children, tooltip }) => {

    const defaultNotAvailableMessage = NAMessage ?? (<p>{lang.noInfoAvailable}</p>);

    return (
        <section className={`single-info-layout ${className}`}>
            <header>
                <h4>{title}</h4>
                {tooltip && <Tip header={tooltip?.header} body={tooltip?.body}/>}
            </header>
            <div className={`single-info-layout__main`}>
                {children && children}
                {!children && (defaultNotAvailableMessage)}
            </div>
        </section>
    )
}
export default SingleInfo