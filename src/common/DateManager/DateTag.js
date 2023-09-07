

const DateTag = (props) => {
    const {
        value,
        label
    } = props;

    return (
        <time dateTime={value}> {label} </time>
    )
}

export {DateTag};