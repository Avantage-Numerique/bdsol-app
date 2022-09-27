
import PageHeader from "../../../../app/layouts/Header/PageHeader";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const SingleViewEntityFormLayout = (props) => {

    const formName = props.formName;

    return (
        <div className={`contribution-${formName} pb-3 create-${formName}`}>
            <PageHeader {...props.headerProps}>
                <p>Une taxonomie sert à classifier dans un système ordonné les relations entre les choses. Ajoutez ici une taxonomie pour permettre à une entité d'être relié à cette taxonomie.
                    Par exemple, lier une <strong>personne</strong> à une <strong>occupation</strong> ou une <strong>aptitude</strong> et lier une <strong>organisation</strong> à une <strong>offre de service</strong> et bien d'autre.</p>
            </PageHeader>

            <Container fluid className={"bg-purplelighter pvy-2"}>
                <Row>
                    <Col>
                        <Container>
                            <Row className={"justify-content-center"}>
                                <Col xs={8}>
                                    {props.children}
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
//this must be added into the uri js file.
//export const getServerSideProps = withSessionSsr(ssrCanAccess);

export default SingleViewEntityFormLayout