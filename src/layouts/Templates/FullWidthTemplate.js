const FullWidthTemplate = (props) => {
    const { children, className } = props;

    return <main className={`container-fluid ${className}`}>{children}</main>;
};

export default FullWidthTemplate;
