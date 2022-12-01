import { useState } from 'react' 

//Hooks
import { useModal } from '@/src/hooks/useModal/useModal'

//Components
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml'
import Button from '@/src/common/FormElements/Buttons/Button/Button'
import UpdatePersonForm from '@/DataTypes/Person/Components/Forms/update/UpdatePersonForm'

//Styling
import styles from './MainPersonView.module.scss'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { sendExternalApiRequest } from '@/src/hooks/http-hook'

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
        occupations,
        createdAt,
        updatedAt,
        status
    } = data

    //Modal hook
    const { modal, Modal, displayModal, closeModal } = useModal()

    //Called by the select. Not in use right now
    const displayUpdateForm = selectStatus => {
       // if(selectStatus === "editing") displayModal()
       displayModal()
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
                            <a className="text-white" href="/"> &#8629; Retour </a>
                        </Col>
                        <Col sm={"auto"} lg={4}>
                            <Button onClick={displayUpdateForm}>
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
                                        <span>Langue : </span>Information bientôt disponible.
                                    </div>

                                    <div className={`${styles["quick-section__single-info"]}`}>
                                        <span>Citoyenneté : </span>Information bientôt disponible.
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
                <Container>
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
                                NAMessage={<p>Information bientôt disponible.</p>}
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
                                    <p>Tel : (123)-456-7890 <br/>
                                        Courriel : mail@mail.com
                                    </p>
                                </SingleInfoLayout>

                                <SingleInfoLayout 
                                    title={"Adresse"}
                                    NAMessage={<p>Information non disponible</p>}
                                >
                                    <p>123, rue Adresse<br/>
                                        Ville, Code postal, Qc
                                        </p>
                                </SingleInfoLayout>

                                <SingleInfoLayout 
                                    title={"Comptétences"}
                                    NAMessage={<p>Information non disponible</p>}
                                >
                                    <Container>
                                        <ul className="row">
                                            {
                                            occupations.length == 0 ?
                                            <div>Aucune occupation associée</div>
                                            :
                                            occupations.map( (occ) => {
                                                return <li key={"occupation-" + occ.occupation._id} className={`col col-sm-auto ${styles["competency-tag"]}`}>{occ.occupation.name}</li>
                                            })
                                            }
                                        </ul>
                                    </Container>
                                    
                                </SingleInfoLayout>

                            </aside>
                        </Col>
                    </Row>
                </Container>


            </section>


        </article>

        {/********** Modal display ************/}
        { modal.display &&
            <Modal 
                className={`${styles["person-form-modal"]}`}
                coloredBackground
                darkColorButton
                closingFunction={closeModal}
            >
               <UpdatePersonForm initValues={data}/>
            </Modal>
            }
    </>
    )
}


export default MainPersonView
