import { useState } from "react";
import Icon from "@/common/widgets/Icon/Icon";

export const Collapse = (props) => {
    const { keyId, btnLabel, btnIcon, show, children } = props;

    const isExpanded = show === true ? "true" : "false";
    const label = btnLabel ? btnLabel : "";
    const [showContent, setShowContent] = useState(show);

    const onCollapseClick = () => {
        setShowContent(!showContent);
    };

    return (
        <div>
            <nav>
                <button
                    className="btn btn-outline-secondary small"
                    type="button"
                    data-toggle="collapse"
                    data-target={`#${keyId}`}
                    aria-expanded={isExpanded}
                    aria-controls={`${keyId}`}
                    onClick={onCollapseClick}
                >
                    {btnIcon && <Icon iconName={btnIcon} />}
                    {label}
                </button>
            </nav>
            <div className={`collapse ${showContent ? "show" : ""}`} id={`${keyId}`}>
                {children}
            </div>
        </div>
    );
};
