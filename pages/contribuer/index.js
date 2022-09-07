import { useContext } from 'react'

//Components
import Button from '../../app/common/FormElements/Buttons/Button/Button'
import Button2 from 'react-bootstrap/Button';

//Context
import { AuthContext } from '../../authentication/context/auth-context'

//styling
import styles from './contribution-page.module.scss'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


const Index = () => {

    //Import the authentication context
    const auth = useContext(AuthContext);

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
                        <h4 className="col-12">Sélectionnez le type d'entité que vous voulez ajouter</h4>

                        {/* Not beautiful but it works for now. Let know the user that he needs to be connected to edit the database */}
                        {!auth.isLoggedIn &&
                            <div className="col-12" style={{ marginBottom: "1rem" }}>
                                <span className="text-danger"><strong>Attention ! </strong></span>
                                Vous devez être connecté afin de pouvoir éditer la base de données.
                            </div>
                        }


                        <Container fluid className='p-0'>
                            <Row className='g-3'>
                                <Col sm={6} md={4} xl>
                                    <div class="d-grid">
                                        <Button2 href="/contribuer/personne" size="lg" disabled={!auth.isLoggedIn}>Personne</Button2>
                                    </div>
                                </Col>
                                <Col sm={6} md={4} xl>
                                    <div class="d-grid">
                                        <Button2 href="/contribuer/organisation" size="lg" disabled={!auth.isLoggedIn}>Organisation</Button2>
                                    </div>
                                </Col>
                                <Col sm={6} md={4} xl>
                                    <div class="d-grid">
                                        <Button2 href="/" size='lg' disabled>Projet</Button2>
                                    </div>
                                </Col>
                                <Col sm={6} md={4} xl>
                                    <div class="d-grid">
                                        <Button2 href="/" size='lg' disabled>Événement</Button2>
                                    </div>
                                </Col>
                                <Col sm={6} md={4} xl>
                                    <div class="d-grid">
                                        <Button2 href="/" size='lg' disabled>Matériel</Button2>
                                    </div>
                                </Col>
                            </Row>
                        </Container>


                    </div>

                </div>

            </section>

        </div>
    )

}

export default Index