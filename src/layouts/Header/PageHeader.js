
import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SanitizedInnerHtml from "@/src/utils/SanitizedInnerHtml";
import Button2 from "react-bootstrap/Button";

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
            <Container fluid>
                <Row>
                    <Col>
                        <Container>
                            <Row className={'justify-content-center'}>
                                <Col xs={colNumberXs} className={"d-flex flex-column justify-content-center"}>
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
                                </Col>
                                {props.image &&
                                    <Col xs={asideColNumberXs}>
                                        <img
                                            className={"img-fluid"}
                                            src={props.image}
                                            alt={(props.imageAlt ?? props.title)}
                                        />
                                    </Col>
                                }
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </header>
    )
}

export default PageHeader;