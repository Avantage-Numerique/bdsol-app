const { default: PageHeader } = require("@/src/layouts/Header/PageHeader");


const FAQ = () => {

    return (
        <div>
            <PageHeader title={`FAQ`}/>
            <div className="content">
                <a href="/FAQ/licences">
                    Tout sur les licences
                </a>
            </div>
        </div>
    );
}

export default FAQ;