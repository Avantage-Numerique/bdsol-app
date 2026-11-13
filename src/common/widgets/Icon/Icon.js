/**
 * @typedef IconProps
 *
 * @property {keyof HTMLElementTagNameMap} Tag Tag to use for the icon, default <i>
 *
 * @property {'las' | 'lar' | 'lab'} vendor It's the class that setup the target icon font, default is las for line awesome.
 * @property {string} prefix It,s the icon name class's prefix, default is for line awesome.
 * @property {string} iconName Name of the target icon to add, without the prefix and vendor class.
 * @property {'la-xs' | 'la-sm' | 'la-lg' | 'la-1x' | 'la-2x' | 'la-3x' | 'la-4x' | 'la-5x' | 'la-6x' | 'la-7x' | 'la-8x' | 'la-9x' | 'la-10x' | 'la-fw'} iconSize
 *
 * @property {string} className additionnal class to add as is in the element className property.
 */

/**
 * Add an icon with a tag i with line awesome as default supported classes.
 *
 * LIST OF ICONS AVAILABLE HERE : https://icons8.com/line-awesome
 *
 * @param {IconProps} props
 * @return {JSX.Element}
 * @constructor
 */
const Icon = (props) => {
    let { iconName, className, vendor, prefix, Tag, style } = props;

    Tag = Tag ?? "i";
    className = className ?? "";
    vendor = vendor ?? "las";
    prefix = prefix ?? "la";

    const prefixSep = "-";

    return <Tag className={`${vendor} ${prefix}${prefixSep}${iconName} ${className}`} style={style}></Tag>;
};

export default Icon;
