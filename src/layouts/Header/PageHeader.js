
import React from "react";

import SanitizedInnerHtml from "@/src/utils/SanitizedInnerHtml";

import styles from './PageHeader.module.scss';

const PageHeader = (props) => {

    const bgClass = props.bg ?? "bg-light";
    const textClass = props.textColor ?? "text-primary";
    const colWidth = props.colWidth ?? 12;
    const asideColNumberXs = 4;
    const colNumberXs = props.image ? colWidth - asideColNumberXs : colWidth;
    const historyBack = props.historyBack;

    return (
        <header className={`${styles['page-header']} ${bgClass}`}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="container">
                            <div className='row justify-content-center'>
                                <div className={`col col-xs-${colNumberXs} d-flex flex-column justify-content-center`}>
                                    {historyBack &&
                                    <div className={"d-flex justify-content-end"}>
                                        <Button2 variant="outline-primary" href={historyBack.uri}>
                                            {historyBack.label}
                                        </Button2>
                                    </div>
                                    }
                                    <h1 className={textClass}>{props.title}</h1>
                                    {props.subTitle &&
                                        <h3 className={textClass}>{props.subTitle}</h3>
                                    }
                                    {props.description &&
                                        <SanitizedInnerHtml tag={"p"}>
                                            {props.description}
                                        </SanitizedInnerHtml>
                                    }
                                    {props.children &&
                                        props.children
                                    }
                                </div>
                                {props.image &&
                                    <div className={`col col-xs-${asideColNumberXs}`}>
                                        <img
                                            className={"img-fluid"}
                                            src={props.image}
                                            alt={(props.imageAlt ?? props.title)}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default PageHeader;