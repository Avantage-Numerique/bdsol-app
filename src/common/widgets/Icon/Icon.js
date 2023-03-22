
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
    //line awesome parameters.
    vendor = vendor ?? 'las';
    prefix = prefix ?? 'la';

    return (
        <Tag className={`${vendor} ${prefix}-${iconName} ${className}`}></Tag>
    )
}

export default Icon