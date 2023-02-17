import {lang} from "@/common/Data/GlobalConstants";

const SingleInfo = ({ title, NAMessage, children }) => {

    const defaultNotAvailableMessage = NAMessage ?? (<p>{lang.noInfoAvailable}</p>);

    return (
        <section className={`single-info-layout`}>
            <h4>{title}</h4>
            <div className={`single-info-layout__main`}>
                {children && children}
                {!children && (defaultNotAvailableMessage)}
            </div>
        </section>
    )
}
export {SingleInfo};