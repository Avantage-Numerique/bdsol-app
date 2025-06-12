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
            <div className={"col col-12 col-lg-7"}>
                {children}
            </div>
        );
    }

    return (
        <main className={`container-fluid header-less-page ${className}`}>
            <div className={"row"}>
                <MainContent />
                <Column1 />
            </div>
        </main>
    );
}

export default Golden2Columns;