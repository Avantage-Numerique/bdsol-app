import { lang } from "@/src/common/Data/GlobalConstants";
import Textarea from "@/src/common/FormElements/Textarea/Textarea";
import { useFieldTips } from "@/src/hooks/useFieldTips/useFieldTips";
import Icon from "@/common/widgets/Icon/Icon";

const ShortDescription = ({ formTools, name, ...props }) => {
    const staticShortDescriptionTip = {
        header: lang.shortDesc,
        body: lang.shortDescDirectives,
    };
    const { TipPopOver, TipButton } = useFieldTips(staticShortDescriptionTip);
    return (
        <>
            <div className={"d-flex align-items-center justify-content-between"}>
                <label htmlFor={name}>{lang.shortDesc}</label>
                <TipButton title={lang.shortDesc} />
            </div>
            <TipPopOver />
            <Textarea formTools={formTools} name={name} maxLength="160" />
            <p className={"py-2"}>
                <Icon iconName={"exclamation-triangle"} /> {lang.shortDescImportantNote}
            </p>
        </>
    );
};

/**
 * @deprecated
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ShortDescriptionDisplay = (props) => {
    const { children } = props;

    return (
        <div>
            <label>{lang.shortDesc}</label>
            <div className="mt-2">{children}</div>
        </div>
    );
};

export { ShortDescription, ShortDescriptionDisplay };
