import { useState } from 'react' 

//Components
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml'
import Button from '@/src/common/FormElements/Buttons/Button/Button'
import Modal from '@/src/common/Containers/Modal/Modal'
import UpdatePersonForm from '@/DataTypes/Person/Components/Forms/update/UpdatePersonForm'

//Styling
import styles from './MainPersonView.module.scss'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SingleInfoLayout = ({ title, NAMessage, children }) => {

    return (
        <section className={`my-2 ${styles["singleInfoLayout"]}`}>
            <h4>{title}</h4>
            <div className={`px-3 ${styles["singleInfoLayout__main"]}`}>
                {children && children}
                {!children && NAMessage && (<>{NAMessage}</>)}
            </div>
        </section>
    )
}

const MainPersonView = ({ data }) => {

    const { 
        _id,
        firstName,
        lastName,
        nickname,
        description,
        createdAt,
        updatedAt,
        status
    } = data   
    
    /*
     *    
        Modal State
     *
     */
    const [modal, setModal] = useState({
        display: false,
        //Values to be passe from the first form to the form displayed in the modal. In this case, all the fields of a person form.
        enteredValues: {

        },  
        callback: () => {}
    })

    //Called by the select. Not in use right now
    const displayModal = selectStatus => {
        
        if(selectStatus === "editing")
            setModal(prev => ({...prev, display: true}))

    }


    return (
    <>
        <article className={`${styles["person-view"]}`}>
            
            {/*
            *
            *  HEADER 
            * 
            */}
            <header className={`${styles["person-view__header"]}`}>

                {/* Background image */}
                <figure className={`${styles["person-view__bg-img"]}`}>
                    <img className={`${styles["person-view__bg-img__img"]}`} src="/general_images\forestBG.jpg" alt="Background image for a person card"/>
                    <div className={`${styles["black-gradient"]}`}></div>
                </figure>

                {/* To menu of the page */}
                <Container className={`${styles["person-view__top-menu"]}`}> 
                    <Row className="justify-content-between mb-4">
                        <Col sm={6} lg={8} className="justify-content-end">
                            <button className="text-white"> &#8629; Retour </button>
                        </Col>
                        <Col sm={"auto"} lg={4}>
                            <Button onClick={() => setModal(prev => ({...prev, display: true}))}>
                                Proposer une modification
                            </Button>
                            {/* 
                            <div>
                                <form>
                                    <label className="text-white">
                                        Mode d'affichage : 
                                        <select onChange={e => displayModal(e.target.value)}>
                                            <option value="viewing">Lecture</option>
                                            <option disabled value="commenting">Commentaires</option>
                                            <option value="editing">Édition</option>
                                        </select>
                                    </label>
                                </form>
                            </div>
                            */}
                        </Col>
                    </Row>
                </Container>

                {/* Header's content */}
                <section className={`${styles["person-view__header__content"]}`}>
                    <Container className={`${styles["headers-content__main-section"]}`}>      
                        <Row>
                            <Col sm={6} lg={8}>

                                <h2 className="mb-2">{firstName} {lastName}</h2>
                                <p> {nickname} </p>

                                {/*
                                *
                                *      Quick informations
                                * 
                                */}
                                <div className={`${styles["quick-section"]}`}>

                                    <div className={`${styles["quick-section__single-info"]}`}>
                                        <span>Langue : </span>Inconnu
                                    </div>

                                    <div className={`${styles["quick-section__single-info"]}`}>
                                        <span>Citoyenneté : </span>Inconnu
                                    </div>

                                </div>
                            </Col>
                            <Col sm={"auto"} lg={4}>
                                <aside>
                                    <div>
                                        <p>Ceci est une proposition d'appel à l'action. Il reste donc à déterminer s'il est pertinent et quoi mettre à l'intérieur.</p>
                                        <Button small>Appel à l'action</Button>
                                    </div>
                                </aside>
                            </Col>

                        

                        </Row>
                    </Container>

                    {/* Profile picture section */}
                    <div className={`${styles["headers-content__bottom-row"]}`}>
                        <figure className={`${styles["headers-content__profil-picture"]}`}>
                            <img src="/general_images/Dennis_Nedry.webp" alt={`Profil picture of ${firstName} ${lastName}`}/>
                        </figure>
                    </div>

                        
                </section>
            
            </header>


            {/*
            *
            *  MAIN SECTION
            * 
            */}
            <section className={`${styles["person-view__main-section"]}`}>
                <container>
                    <Row>
                        <Col sm={6} lg={8}>
    
                            <SingleInfoLayout 
                                title={"Présentation"}
                                NAMessage={<p>Aucune donnée n'a encore été fournie pour ce champ. <br />Vous pourrez bientôt passer en mode édition afin d'ajouter et modifier des information.</p>}
                            >
                                <SanitizedInnerHtml>
                                    {description}
                                </SanitizedInnerHtml>
                            </SingleInfoLayout>

                            <SingleInfoLayout 
                                title={"Projets"}
                                NAMessage={<p>Information bientôt disponible.</p>}
                            >

                            </SingleInfoLayout>

                            <SingleInfoLayout 
                                title={"Intérêts"}
                                NAMessage={<p>Information bientôt disponible</p>}
                            >
                            </SingleInfoLayout>

                            {
                                status && status.state && status.state &&
                                    <SingleInfoLayout
                                        title="Statut de l'entité"
                                        NAMessage={ status.state == 'Accepted' ? "Acceptée" : "En attente d'approbation"}>
                                    </SingleInfoLayout>
                            }

                            {
                                status && status.requestedBy &&
                                <SingleInfoLayout
                                    title={"Créer par"}
                                    NAMessage={ <p>{ "Numéro d'identification de l'utilisateur : " + status.requestedBy}</p>}>
                                </SingleInfoLayout>
                            }
                            {
                                status && status.lastModifiedBy &&
                                <SingleInfoLayout
                                    title={"Dernière modifications par"}
                                    NAMessage={ <p>{"Numéro d'identification de l'utilisateur : " + status.lastModifiedBy}</p>}>
                                </SingleInfoLayout>
                            }

                        </Col>
                        <Col sm={"auto"} lg={4}>
                    
                            <aside>

                                <SingleInfoLayout 
                                    title={"Moyen de contact"}
                                    NAMessage={<p>Information non disponible</p>}
                                >
                                    <p>Tel : (819) 764-5692 <br/>
                                        Email : mail@mail.com
                                    </p>
                                </SingleInfoLayout>

                                <SingleInfoLayout 
                                    title={"Adresse"}
                                    NAMessage={<p>Information non disponible</p>}
                                >
                                    <p>234 rue Larivière<br/>
                                        Rouyn-Noranda, Qc
                                        </p>
                                </SingleInfoLayout>

                                <SingleInfoLayout 
                                    title={"Comptétences"}
                                    NAMessage={<p>Information non disponible</p>}
                                >
                                    <Container>
                                        <ul className="row">
                                            <li className={`col col-sm-auto ${styles["competency-tag"]}`}>Développement Web</li>
                                            <li className={`col col-sm-auto ${styles["competency-tag"]}`}>SEO</li>
                                            <li className={`col col-sm-auto ${styles["competency-tag"]}`}>Javascript</li>
                                            <li className={`col col-sm-auto ${styles["competency-tag"]}`}>Design graphique</li>
                                        </ul>
                                    </Container>
                                    
                                </SingleInfoLayout>

                            </aside>
                        </Col>
                    </Row>
                </container>


            </section>


        </article>

        {/********** Modal display ************/}
        { modal && modal.display &&
            <Modal 
                className={`${styles["person-form-modal"]}`}
                coloredBackground
                darkColorButton
                closingFunction={() => {setModal(prev => ({...prev, display: false}))}}
            >
                <UpdatePersonForm initValues={data}/>
            </Modal>
            }
    </>
    )
}


export default MainPersonView
