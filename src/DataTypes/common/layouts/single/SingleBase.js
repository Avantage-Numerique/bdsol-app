//Styles
import styles from './SingleBase.module.scss';

//Component
import SingleBaseHeader from './defaultSections/SingleBaseHeader';
import {Breadcrumbs} from "@/common/Breadcrumbs/Breadcrumbs";


/**
 * 
 * @param {React.Component} header
 * @param {React.Component} mainImageContainer
 * @param {React.Component} fullWidthContent content under header
 * @param {React.Component} contentColumnLeft main content column left
 * @param {React.Component} contentColumnRight main content column right
 * @param {React.Component} footer
 * 
 */

const SingleBase = (props) => {

    //Main props destructuring
    const {
        breadCrumb,
        header,
        fullWidthContent,
        contentColumnLeft,
        contentColumnRight,
        footer
    } = props;

    const defaultHeaderBg = props.defaultHeaderBg ?? "/general_images/single-header-default-bg.png"

    return (
        <div className="container">
            { /* BreadCrumbs */ }
            {  breadCrumb &&
            <div className="row">
                <Breadcrumbs className={"pt-2"} route={breadCrumb.route} getLabelGenerator={breadCrumb.getLabelGenerator || undefined} getHrefGenerator={breadCrumb.getHrefGenerator || undefined} />
            </div>
            }
            
            { /* Header */ }
            {/* Background image */}
            <header className={`${styles["header-base"]} row position-relative`}>
                <figure className={`${styles["background-image-figure"]} p-0 rounded overflow-hidden bg-primaryextratlight`}>
                    <img className="w-100 opacity-25" src={defaultHeaderBg} alt="Image d'arrière plan de l'entête"/>
                    <div className={`dark-transparent-gradient doubled`}></div>
                </figure>

                {/* Header's content */}
                { header ?? <SingleBaseHeader/> }
            </header>
            
            { /* FullWidthContent */ }
            <section className="row p-2 my-4">
                { fullWidthContent && fullWidthContent }
            </section>

            { /* ContentColumn */ }
            <div className="row p-2 my-4">

                { /* ContentColumnLeft */ }
                <section className="col-md-8">
                    { contentColumnLeft && contentColumnLeft }
                </section>

                    
                { /* ContentColumnRight */ }
                <section className="col-md-4">
                    { contentColumnRight && contentColumnRight }
                </section>

            </div>

            { /* Footer */ }
            <footer className="row p-2">
                { footer && footer }
            </footer>

        </div>
    )

}

export default SingleBase;