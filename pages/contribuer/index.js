
//Components
import Button from '../../app/common/FormElements/Buttons/Button/Button'
import Button2 from 'react-bootstrap/Button';

//Context
import {useAuth} from '../../authentication/context/auth-context'

//styling
import styles from './contribution-page.module.scss'
import {withSessionSsr} from "../../authentication/session/handlers/withSession";
import {ssrCanAccess} from "../../authentication/permissions/ssrCanAccess";

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import {lang} from "../../app/common/Data/GlobalConstants";

 
const Index = () => {

    const auth = useAuth();

    return (
        <div className={`col-12 ${styles["contribution-page"]}`}>
           

            <header className={`col-12`}>

                <div className="maxWidthPageContainer">

                    <h1 className={`col-12 text-primary`}>Créer une donnée</h1>
                    <p>Vous avez accès ici à tous les types de données qu'il est présentement possible d'intégrer à la base de données.</p>
                </div>

            </header>

            <section className={`col-12`}>

                {/* Menu for the differents forms */}
                <div className={`maxWidthPageContainer`}>

                    <div className={`col-12 ${styles["contribution-page__menu"]}`}>
                        <Container fluid className='p-0'>

                            { !auth.user.isLoggedIn &&
                                <Row>
                                    <Col>
                                        <span className="text-danger"><strong>Attention ! </strong></span>
                                        Vous devez être connecté afin de pouvoir éditer la base de données.
                                    </Col>
                                </Row>
                            }
                            <Row className='pt-3'>
                                <Col>
                                    <h4 className="col-12">Sélectionnez le type d'entité que vous voulez ajouter</h4>
                                </Col>
                            </Row>
                            <Row className='pt-3'>
                                <Col>
                                    <Button2 href="/contribuer/personne" size="lg" className={"w-100"} disabled={!auth.user.isLoggedIn}>Personne</Button2>
                                </Col>
                                <Col>
                                    <Button2 href="/contribuer/organisation" size="lg" className={"w-100"} disabled={!auth.user.isLoggedIn}>Organisation</Button2>
                                </Col>
                                <Col>
                                    <Button2 href="/contribuer/taxonomy" size="lg" className={"w-100"} disabled={!auth.user.isLoggedIn}>Taxonomy</Button2>
                                </Col>
                            </Row>

                            <Row className='pt-3'>
                                <Col>
                                    <h4 className="col-12">Entités à venir</h4>
                                </Col>
                            </Row>
                            <Row className='pt-3'>
                                <Col>
                                    <Button2 href="/" size='lg' className={"w-100"} disabled>Projet</Button2>
                                </Col>
                                <Col>
                                    <Button2 href="/" size='lg' className={"w-100"} disabled>Événement</Button2>
                                </Col>
                                <Col>
                                    <Button2 href="/" size='lg' className={"w-100"} disabled>Matériel</Button2>
                                </Col>
                            </Row>

                        </Container>


                    </div>
                </div>

            </section>

        </div>
    )

}
export const getServerSideProps = withSessionSsr(ssrCanAccess);

export default Index