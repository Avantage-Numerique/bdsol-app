import { lang } from "@/src/common/Data/GlobalConstants";
import Textarea from "@/src/common/FormElements/Textarea/Textarea";

const ShortDescription = ({ formTools, name, ...props }) => {
    return (
        <>
            <Textarea formTools={formTools} name={name} label="Description courte (SEO)" maxLength="160" />
        </>
    );
};

const ShortDescriptionDisplay = (props) => {
    const { children } = props;

    return (
        <>
            <div>
                <strong>{lang.shortDesc} :</strong>
                <div className="mt-2">{children}</div>
            </div>
        </>
    );
};

export { ShortDescription, ShortDescriptionDisplay };
