import { lang } from "@/src/common/Data/GlobalConstants";

const ContactPointView = ({contact, ...props}) => {
    const {tel, email, website} = contact;

    const telSection = tel.num !== "" && (
        <article className={`d-flex flex-column p-2 mb-2`}>
            <h5 className="text-dark mb-2">{lang.phoneNumber}</h5>
            {tel.num}{tel.ext !== "" && `#${tel.ext}`}
        </article>
    )
    const emailAddressSection = email.address !== "" && (
        <article className={`d-flex flex-column p-2 mb-2`}>
            <h5 className="text-dark mb-2">{lang.email}</h5>
            {email.address}
        </article>
    )
    const websiteUrlSection = website.url !== "" && (
        <article className={`d-flex flex-column p-2 mb-2`}>
            <h5 className="text-dark mb-2">{lang.website}</h5>
            {website.url}
        </article>
    )
    return (
        <>
            {telSection}
            {emailAddressSection}
            {websiteUrlSection}
        
        </>
    )
}

export {ContactPointView}