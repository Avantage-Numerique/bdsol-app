const Golden2Columns = (props) => {

    // add parameters to set right or left oriented layout.
    // add fullwidth or contained parameter
    const {children, columnContent, className} = props;

    const Column1 = () => {
        return (
            <div className={"col col-12 col-lg-5"}>
                {columnContent}
            </div>
        );
    }

    const MainContent = () => {
        return (
            <div className={"col col-12 col-lg-7 d-flex justify-content-center align-items-center"}>
                <div>
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div className={`row ${className}`}>
            <MainContent />
            <Column1 />
        </div>
    );
}

export default Golden2Columns;