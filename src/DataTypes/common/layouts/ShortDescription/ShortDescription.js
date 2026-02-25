import Textarea from "@/src/common/FormElements/Textarea/Textarea";

const ShortDescription = ({ formTools, name, ...props }) => {
    return (
        <>
            <Textarea formTools={formTools} name={name} label="Description courte (SEO)" maxLength="160" />
        </>
    );
};

const ShortDescriptionDisplay = (props) => {
    return (
        <>
            <div className="d-flex flex-wrap justify-content-start text-break">{props.children}</div>
        </>
    );
};

export { ShortDescription, ShortDescriptionDisplay };
