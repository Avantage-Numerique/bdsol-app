//Styles
import styles from './SingleBase.module.scss';

//Component
import SingleBaseHeader from './defaultSections/SingleBaseHeader';


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
        header,
        fullWidthContent,
        contentColumnLeft,
        contentColumnRight,
        footer
    } = props;

    const defaultHeaderBg = props.defaultHeaderBg ?? "/general_images/forestBG.jpg"

    return (
        <>
            { /* BreadCrumbs */ }
            <div className="row">
                {//<BreadCrumbs
                }
            </div>
            
            { /* Header */ }
                {/* Background image */}
            <header className={`${styles["header-base"]} row position-relative`}>
                <figure className={`${styles["background-image-figure"]} p-0`}>
                    <img className="w-100" src={defaultHeaderBg} alt="Forêt embrumée"/>
                    <div className={`dark-transparent-gradient`}></div>
                </figure>

                {/* Header's content */}
                { header ?? <SingleBaseHeader/> }

            </header>
            
            
            { /* FullWidthContent */ }
            <section className="row">
                { fullWidthContent && fullWidthContent }
            </section>

            { /* ContentColumn */ }
            <div className="row">

                { /* ContentColumnLeft */ }
                <section className="col-md-6">
                    { contentColumnLeft && contentColumnLeft }
                </section>

                    
                { /* ContentColumnRight */ }
                <section className="col-md-6">
                    { contentColumnRight && contentColumnRight }
                </section>

            </div>

            { /* Footer */ }
            <footer className="row">
                { footer && footer }
            </footer>

        </>
    )

}

export default SingleBase;