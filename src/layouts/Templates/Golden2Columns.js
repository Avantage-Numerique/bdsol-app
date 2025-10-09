const Golden2Columns = (props) => {
    // add parameters to set right or left oriented layout.
    // add fullwidth or contained parameter
    const {
        children,
        columnContent,
        className,
        contentClassName,
        columnClassName,
        style,
    } = props;

    const Column1 = ({ columnClassName }) => {
        return (
            <div className={`golden-grid-ordered__minor ${columnClassName}`}>
                {columnContent}
            </div>
        );
    };

    const MainContent = ({ contentClassName }) => {
        return (
            <div
                className={`golden-grid-ordered__major d-flex justify-content-center align-items-center ${contentClassName}`}
            >
                {children}
            </div>
        );
    };

    return (
        <div
            className={`golden-layout golden-grid-ordered ${className}`}
            style={{ ...style }}
        >
            <MainContent contentClassName={contentClassName} />
            <Column1 columnClassName={columnClassName} />
        </div>
    );
};

export default Golden2Columns;
