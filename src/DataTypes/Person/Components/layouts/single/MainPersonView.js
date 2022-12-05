import { useState } from 'react' 

//Components
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml'
import Button from '@/src/common/FormElements/Button/Button'
import Modal from '@/src/common/Containers/Modal/Modal'
import UpdatePersonForm from '@/DataTypes/Person/Components/Forms/update/UpdatePersonForm'
import { useEffect } from 'react'
import {useHttpClient} from '@/src/hooks/http-hook';

//Styling
import styles from './MainPersonView.module.scss'

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
    } = data;

    const {sendRequest} = useHttpClient();
    
    //State that contains the organisations that the person is part of
    const [memberOfOrganisationList, setMemberOfOrganisationList] = useState([]);
    useEffect( () => {
        async function fetchMemberOf() {
            const response = await sendRequest(
                ("/organisations/list"),
                'POST',
                JSON.stringify({ data: { "team.member" : _id }})
            );
            setMemberOfOrganisationList(response.data)
        }
        fetchMemberOf()
    }, [])

    useEffect( () => console.log("memberOf", memberOfOrganisationList, memberOfOrganisationList.length != 0), [memberOfOrganisationList])

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
                <div className={`container ${styles["person-view__top-menu"]}`}>
                    <div className="row justify-content-between mb-4">
                        <div className="col-6 col-lg-8 justify-content-end">
                            <a className="text-white" href="/"> &#8629; Retour </a>
                        </div>
                        <div className={"col-auto col-lg-4"}>
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
                        </div>
                    </div>
                </div>

                {/* Header's content */}
                <section className={`${styles["person-view__header__content"]}`}>
                    <div className={`container ${styles["headers-content__main-section"]}`}>
                        <div className={'row'}>
                            <div className={"col-6 col-lg-8"}>

                                <h2 className="mb-2">{firstName} {lastName}</h2>
                                <p> {nickname} </p>

                                {/* Quick informations */}
                                <div className={`${styles["quick-section"]}`}>

                                    <div className={`${styles["quick-section__single-info"]}`}>
                                        <span>Langue : </span>Information bientôt disponible.
                                    </div>

                                    <div className={`${styles["quick-section__single-info"]}`}>
                                        <span>Citoyenneté : </span>Information bientôt disponible.
                                    </div>

                                </div>
                            </div>
                            <aside className={"col-auto col-lg-4"}>
                                    <div>
                                        <p>Ceci est une proposition d'appel à l'action. Il reste donc à déterminer s'il est pertinent et quoi mettre à l'intérieur.</p>
                                        <Button small>Appel à l'action</Button>
                                    </div>
                            </aside>
                        </div>
                    </div>

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
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col-6 col-lg-8"} sm={6} lg={8}>
    
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
                                status && status.state &&
                                    <SingleInfoLayout
                                        title="Statut de l'entité"
                                        NAMessage={ status.state == 'accepted' ? "Acceptée" : "En attente d'approbation"}>
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

                        </div>
                        <aside className={"col-auto col-lg-4"}>
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
                                <div className={"container"}>
                                    <ul className="row">
                                        { occupations.length == 0 ?
                                            <div>Aucune occupation associée</div>
                                            :
                                            occupations.map( (occ) => {
                                                return <li key={"occupation-" + occ.occupation._id} className={`col col-sm-auto ${styles["competency-tag"]}`}>{occ.occupation.name}</li>
                                            })
                                        }
                                    </ul>
                                </div>

                            </SingleInfoLayout>
                        </aside>
                    </div>
                </div>


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
