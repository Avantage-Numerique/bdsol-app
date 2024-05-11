import { lang } from "@/src/common/Data/GlobalConstants";

const ContactPointView = ({contact, ...props}) => {
    const tel = contact?.tel ?? {num:"", ext:""};
    const email = contact?.email ?? {address:""};
    const website = contact?.website ?? {url:""};

    const telSection = tel.num !== "" && (
        <article className={`d-flex flex-column p-2 mb-2`}>
            <h5 className="text-dark mb-2">{lang.phoneNumber}</h5>
            {/* Not wise to put <a href="tel: ...> because we don't force telephone format atm*/}
            {tel.num}{tel.ext !== "" && `#${tel.ext}`}
        </article>
    )
    const emailAddressSection = email.address !== "" && (
        <article className={`d-flex flex-column p-2 mb-2`}>
            <h5 className="text-dark mb-2">{lang.email}</h5>
            <a href={"mailto:"+email.address}>{email.address}</a>
        </article>
    )
    const websiteUrlSection = website.url !== "" && (
        <article className={`d-flex flex-column p-2 mb-2`}>
            <h5 className="text-dark mb-2">{lang.website}</h5>
            <a href={website.url}>{website.url}</a>
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