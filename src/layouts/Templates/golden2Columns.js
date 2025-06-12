

const Golden2Columns = (props) => {

    // add parameters to set right or left oriented layout.
    // add fullwidth or contained parameter
    const {children, columnContent} = props;

    const Column1 = () => {
        return (
            <div className={"col col-lg-7"}>
                {{columnContent}}
            </div>
        )
    }

    const MainContent = () => {
        return (
            <div className={"col col-lg-5"}>
                {{children}}
            </div>
        )
    }

    return () => {
        <div className={"container-fluid"}>
            <div className="row">
                <MainContent />
                <Column1 />
            </div>
        </div>
    }
}