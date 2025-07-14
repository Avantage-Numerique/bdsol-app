import {useState} from "react";


export const Collapse = (props) => {

    const {
        keyId,
        btnLabel,
        show,
        children
    } = props;

    const isExpanded = show === true ? "true" : "false";
    const label = btnLabel ? btnLabel : "Collapse BTN";
    const [showContent, setShowContent] = useState(show);

    const onCollapseClick = () => {
        setShowContent(!showContent);
    }

    return (
        <div>
            <nav>
                <button className="btn btn-primary" type="button" data-toggle="collapse"
                        data-target={`#${keyId}`} aria-expanded={isExpanded} aria-controls={`${keyId}`} onClick={onCollapseClick}>
                    {label}
                </button>
            </nav>
            <div className={`collapse ${showContent ? "show" : ""}`} id={`${keyId}`}>
                {children}
            </div>
        </div>
    );
}