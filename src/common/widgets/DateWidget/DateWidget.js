import {getDateFromIsoString} from "@/src/utils/DateHelper";

/**
 * Add a date with a <span> tag
 * @param props.stringDate {string} the date in string
 * @param props.classClass {string} additional class to add as is in the element className property.
 * @param props.lang {string} Precise the language in wich the string will be printed.
 * @param props.timezone {string} Set the date for target timezone. Default UTC
 * @param props.Tag {Component||string de tag} Tag to use for the icon, default <i>
 * @return {JSX.Element}
 * @constructor
 * @documentation https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
 */
const DateWidget = (props) => {

    let {
        stringDate,
        className,
        lang,
        timezone,
        Tag
    } = props;

    Tag = Tag ?? 'span';
    className = className ?? '';
    lang = lang ?? "fr-CA";
    timezone = timezone ?? "UTC";

    const date_FromString = new Date(getDateFromIsoString(stringDate));
    const formater = Intl.DateTimeFormat(lang, { timeZone: timezone });//date in db are store in UTC-0 so no need to adjust it there.

    if (stringDate !== "" && date_FromString) {
        return (
            <Tag className={`${className}`} title={stringDate}>{formater.format(date_FromString)}</Tag>
        )
    }
}

export default DateWidget;