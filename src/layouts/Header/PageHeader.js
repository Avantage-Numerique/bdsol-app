
import React from "react";

import SanitizedInnerHtml from "@/src/utils/SanitizedInnerHtml";

import Button from "@/src/common/FormElements/Button/Button"

import styles from './PageHeader.module.scss';

const PageHeader = (props) => {

    const bgClass = props.bg ?? "bg-light";
    const titleColor = props.titleColor ? `text-${props.titleColor}` : "text-dark";
    const subtitleColor = props.subtitleColor ? `text-${props.subtitleColor}` : "text-dark";
    const subtitleLineColor = props.subtitleColor ? `bg-${props.subtitleColor}` : "bg-dark";
    const descriptionColor = props.descriptionColor ?? "text-dark";
    const textClass = props.textColor ?? "text-primary";
    const colWidth = props.colWidth ?? 12;
    const asideColNumberXs = 4;
    const colNumberXs = props.image ? colWidth - asideColNumberXs : colWidth;
    const historyBack = props.historyBack;

    return (
        <header className={`${styles['page-header']} ${bgClass}`}>
            <div className="container">
                <div className='row justify-content-center align-items-center'>
                    <div className={`col col-sm-${colNumberXs} d-flex flex-column justify-content-center`}>
                        {historyBack &&
                        <div className={"d-flex justify-content-end"}>
                            <Button color="white" outline="primary" href={historyBack.uri}>
                                {historyBack.label}
                            </Button>
                        </div>
                        }
                        
                        {props.title &&
                            <h1 className={titleColor}>{props.title}</h1>
                        }
                        
                        {props.htmlTitle &&
                            <h1 className={titleColor} dangerouslySetInnerHTML={{ __html: props.htmlTitle }}></h1>
                        }
                        
                        <div className={`${styles.subtitleLine}`}>
                            <div className={subtitleLineColor}></div>
                            <div className={subtitleLineColor}></div>
                        </div>
                        
                        {props.subTitle &&
                            <h3 className={subtitleColor} dangerouslySetInnerHTML={{ __html: props.subTitle}}></h3>
                        }
                        
                        {props.description &&
                            <SanitizedInnerHtml tag={"p"} className={descriptionColor}>
                                {props.description}
                            </SanitizedInnerHtml>
                        }
                        
                        {props.children &&
                            props.children
                        }
                    </div>
                    {props.image &&
                        <div className={`col-sm-${asideColNumberXs}`}>
                            <img
                                className={"img-fluid"}
                                src={props.image}
                                alt={(props.imageAlt ?? props.title)}
                            />
                        </div>
                    }
                </div>
            </div>
        </header>
    )
}

export default PageHeader;