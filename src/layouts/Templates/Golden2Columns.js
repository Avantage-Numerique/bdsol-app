const Golden2Columns = (props) => {

    // add parameters to set right or left oriented layout.
    // add fullwidth or contained parameter
    const {children, columnContent, className, contentClassName, columnClassName, style} = props;

    const Column1 = ({columnClassName}) => {
        return (
            <div className={`col w-62 ${columnClassName}`}>
                {columnContent}
            </div>
        );
    }

    const MainContent = ({contentClassName}) => {
        return (
            <div className={`col flex-md-column w-38 d-flex justify-content-center align-items-center ${contentClassName}`}>
                {children}
            </div>
        );
    }

    return (
        <div className={`row ${className}`} style={{...style}}>
            <MainContent contentClassName={contentClassName} />
            <Column1 columnClassName={columnClassName} />
        </div>
    );
}

export default Golden2Columns;