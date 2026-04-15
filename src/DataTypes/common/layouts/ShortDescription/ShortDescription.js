import { lang } from "@/src/common/Data/GlobalConstants";
import Textarea from "@/src/common/FormElements/Textarea/Textarea";
import Icon from "@/common/widgets/Icon/Icon";
import Popover from "@/src/common/Components/Popover/Popover";
import { htmlToTextSingleParagraph } from "@/src/helpers/str";

const tip = {
    header: lang.shortDesc,
    body: lang.shortDescDirectives,
};

const ShortDescription = ({ formTools, name, model, ...props }) => {
const generated = model?._generated?.shortDescription || "";

    return (
        <>
            <div className={"d-flex align-items-center justify-content-between"}>
                <label htmlFor={name}>{lang.shortDesc}</label>
                <Popover title={tip.header} body={tip.body} />
            </div>
            <Textarea
formTools={formTools}
name={name}
maxLength="160"
                placeholder={generated ? `${lang.generatedShortDesc} : ${generated}` : ""}
/>
            <p className={"py-2"}>
                <Icon iconName={"exclamation-triangle"} /> {lang.shortDescImportantNote}
            </p>
        </>
    );
};

/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ShortDescriptionDisplay = ({ shortDescription, generatedShortDescription, ...props }) => {
    return (
        <div>
            <div className={"d-flex align-items-center justify-content-between"}>
                <strong>{lang.shortDesc}</strong>
                <Popover title={tip.header} body={tip.body} />
            </div>

            {!shortDescription && generatedShortDescription && (
                <p className="py-2 small text-dark-emphasis">
                    <Icon iconName={"exclamation-circle"} /> {lang.shortDescIsGenerated}
                </p>
            )}

            <div className="mt-2">{htmlToTextSingleParagraph(shortDescription || generatedShortDescription)}</div>
        </div>
    );
};

export { ShortDescription, ShortDescriptionDisplay };
