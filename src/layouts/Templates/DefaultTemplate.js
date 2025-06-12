
const DefaultTemplate = (props) => {

    // add parameters to set right or left oriented layout.
    // add fullwidth or contained parameter
    const {children, className} = props;

    return (
        <main className={`containe ${className}`}>
            <div className="row">
                <div className="col">
                    { children }
                </div>
            </div>
        </main>
    );
}

export default DefaultTemplate;