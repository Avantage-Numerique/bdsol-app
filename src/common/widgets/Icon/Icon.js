/**
 * Add an icon with a tag i with line awesome as default supported classes.
 * @param props.iconName {string} Name of the target icon to add, without the prefix and vendor class.
 * @param props.classClass {string} additionnal class to add as is in the element className property.
 * @param props.vendor {string} It's the class that setup the target icon font, default is las for line awesome.
 * @param props.prefix {string} It,s the icon name class's prefix, default is for line awesome.
 * @param props.Tag {Component||string de tag} Tag to use for the icon, default <i>
 * @return {JSX.Element}
 * @constructor
 */
const Icon = (props) => {

    let {
        iconName,
        className,
        vendor,
        prefix,
        Tag
    } = props;

    Tag = Tag ?? 'i';
    className = className ?? '';
    vendor = vendor ?? 'las';
    prefix = prefix ?? 'la';

    const prefixSep = "-";

    return (
        <Tag className={`${vendor} ${prefix}${prefixSep}${iconName} ${className}`}></Tag>
    )
}

export default Icon;