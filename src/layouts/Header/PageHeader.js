import React from "react";

import SanitizedInnerHtml from "@/src/utils/SanitizedInnerHtml";

import Button from "@/src/common/FormElements/Button/Button"

import styles from './PageHeader.module.scss';
import SearchTag from "@/common/Components/SearchTag";


/**
 * 
 * @param props.colFullWidth {bool} Set the first col to take the full width
 * @param props.custom_FullWidthContent {JSX.Element} Custom component to be added to the component root
 * @param props.custom_LeftColContent {JSX.Element} Custom component to be added to the left colomn
 * @param props.custom_RightColElement {JSX.Element} Custom component to be added to the right colomn
 * @return {JSX.Element}
 * 
 */
const PageHeader = (props) => {

    const bgClass = props.bg ?? "bg-primary-lighter";
    const titleColor = props.titleColor ? `text-${props.titleColor}` : "text-dark";
    const subtitleColor = props.subtitleColor ? `text-${props.subtitleColor}` : "text-dark";
    const subtitleLineColor = props.subtitleColor ? `bg-${props.subtitleColor}` : "bg-dark";
    const descriptionColor = props.descriptionColor ?? "text-dark";
    const textClass = props.textColor ?? "text-primary";
    const colWidth = props.colWidth ?? 12;
    const asideColNumberXs = 5;
    const colNumberXs = props.image ? colWidth - asideColNumberXs : colWidth;
    const historyBack = props.historyBack;
    const asciiArt = props.art ?? "";
    const reverseWrap = props.reverseWrap ? "flex-column-reverse flex-wrap-reverse flex-sm-row" : "";

    return (
        <header className={`${styles['page-header']} ${bgClass} position-relative`}>
            <div className="container">
                <div className={`row justify-content-between align-items-center ${reverseWrap}`}>

                    {props.imageRight &&
                        <div className={`col-12 col-md-${asideColNumberXs} ${styles['stacking-context-reg']}`}>
                            {props.image &&
                                <img
                                    className={"img-fluid"}
                                    src={props.image}
                                    alt={(props.imageAlt ?? props.title)}
                                />
                            }
                            {/* If the custom_RightColElement prop is define, then inject it */}
                            {props.custom_RightColElement && <props.custom_RightColElement/>}
                        </div>
                    }
                    <div className={`${!props.colFullWidth && styles['header-left-col--max-width']} ${styles['stacking-context-front']} ${props.leftColClassName} col-12 col-md-${colNumberXs} d-flex flex-column justify-content-center position-relative`}>
                        {historyBack &&
                        <div className={"d-flex justify-content-end"}>
                            <Button color="white" outline="primary" href={historyBack.uri}>
                                {historyBack.label}
                            </Button>
                        </div>
                        }
                        {asciiArt !== "" &&
                            <pre>{props.art}</pre>
                        }
                        {props.title &&
                            <h1 className={titleColor}>{props.title}</h1>
                        }
                        
                        {props.htmlTitle &&
                            <h1 className={titleColor} dangerouslySetInnerHTML={{ __html: props.htmlTitle }}></h1>
                        }
                        
                        <div className={`${styles.subtitleLine} mb-2`}>
                            <span className={subtitleLineColor}></span>
                            <span className={subtitleLineColor}></span>
                        </div>
                        
                        {props.subTitle &&
                            <h3 className={`${subtitleColor} mb-2 fs-5`} dangerouslySetInnerHTML={{ __html: props.subTitle}}></h3>
                        }

                        {props.tags &&
                            <div className={`${subtitleColor} mb-2 d-flex`}>
                                <SearchTag
                                    list={props.tags.list}
                                    listProperty={props.tags.listProperty}
                                    tagBgColor={"secondary"}
                                />
                            </div>
                        }

                        {props.description &&
                            <SanitizedInnerHtml tag={"p"} className={descriptionColor}>
                                {props.description}
                            </SanitizedInnerHtml>
                        }
                        
                        {props.children &&
                            props.children
                        }
                        {/* If the custom_LeftColContent prop is define, then inject it */}
                        {props.custom_LeftColContent && <props.custom_LeftColContent />}
                    </div>
                    {!props.imageRight &&
                        <div className={`col-12 col-md-${asideColNumberXs} ${styles['stacking-context-reg']}`}>
                            {props.image &&
                                <img
                                    className={"img-fluid"}
                                    src={props.image}
                                    alt={(props.imageAlt ?? props.title)}
                                />
                            }
                            {/* If the custom_RightColElement prop is define, then inject it */}
                            {props.custom_RightColElement && <props.custom_RightColElement/>}
                        </div>
                    }
                </div>
            </div>
            {/* If the custom_FullWidthContent prop is define, then inject it */}
            {props.custom_FullWidthContent && <props.custom_FullWidthContent/>}
        </header>
    )
}

export default PageHeader;