import {lang} from "@/common/Data/GlobalConstants";

const SingleInfo = ({ title, NAMessage, className, children }) => {

    const defaultNotAvailableMessage = NAMessage ?? (<p>{lang.noInfoAvailable}</p>);

    return (
        <section className={`single-info-layout ${className}`}>
            <h4>{title}</h4>
            <div className={`single-info-layout__main`}>
                {children && children}
                {!children && (defaultNotAvailableMessage)}
            </div>
        </section>
    )
}
export default SingleInfo