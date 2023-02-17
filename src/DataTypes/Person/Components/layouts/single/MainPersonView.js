import { useState, useEffect } from 'react' 
import Router from 'next/router';

//Hooks
import { useModal } from '@/src/hooks/useModal/useModal'
import {useHttpClient} from '@/src/hooks/http-hook';

//Components
import Button from '@/src/common/FormElements/Button/Button'
import UpdatePersonForm from '@/DataTypes/Person/Components/Forms/update/UpdatePersonForm'
import CreateMediaForm from '@/DataTypes/Media/components/forms/CreateMedia/CreateMediaForm'

//Styling
import styles from './MainPersonView.module.scss'
import {lang} from "@/common/Data/GlobalConstants";
import SearchTag from '@/src/common/Components/SearchTag';

//Context
import { useAuth } from "@/src/authentification/context/auth-context";

//Utils
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml'



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
        slug,
        createdAt,
        updatedAt,
        status,
        mainImage,
    } = data;

    let fullImagePath;
    if(mainImage)
        fullImagePath = process.env.NEXT_PUBLIC_API_URL +  "/medias/persons/" + _id + "/" + mainImage.fileName + "." + mainImage.extension;

    const {sendRequest} = useHttpClient();

    console.log(mainImage)
    //Authentication ref
    const auth = useAuth();
    
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

    //Modal hook
    const { modal, Modal, displayModal, closeModal } = useModal()

    const img_Modal = useModal();

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
                    <img className={`${styles["person-view__bg-img__img"]}`} src="/general_images/forestBG.jpg" alt="Background image for a person card"/>
                    <div className={`${styles["black-gradient"]}`}></div>
                </figure>

                {/* To menu of the page */}
                <div className={`container ${styles["person-view__top-menu"]}`}>
                    <div className="row justify-content-between mb-4">
                        <div className="col-6 col-lg-8 justify-content-end">
                            <a className="text-white" href="/"> &#8629; Retour </a>
                        </div>
                        <div className={"col-auto col-lg-4"}>
                            <Button onClick={displayUpdateForm}>
                                {lang.proposeContentChangeLabel}
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
                        <figure className={`bg-white ${styles["headers-content__profil-picture"]}`}>
                            {/* Appearing button on mouse over to propose to the user to change the image */}
                            {auth.user.isLoggedIn && //Option only available if connected
                            <button onClick={img_Modal.displayModal} className={`w-100 h-100 position-absolute d-flex align-items-center justify-content-center p-1 text-white ${styles["profile-picture--modification-opt"]}`}>
                                Modifier l'image
                            </button>}
                            {/* If there is an image for the user */}
                            {mainImage && <img src={fullImagePath} alt={mainImage.alt} />}
                            {/* If there is NO an image for the user */}
                            {!mainImage && <img src={"/general_images/Dennis_Nedry.webp"} alt={`Photo de profil de l'utilisateur ${firstName} ${lastName}`} />}
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
                        <div className={"col-6 col-lg-8"}>
    
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
                                        NAMessage={ status.state === 'accepted' ? "Acceptée" : "En attente d'approbation"}>
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
                                    <SearchTag 
                                        className="row"
                                        list={
                                            occupations.map( (entity) => {
                                                return { name : entity.occupation.name, _id: entity.occupation._id }
                                            })
                                        }
                                        textField="name"
                                        NAMessage="Aucune occupation associée"
                                    />
                                </div>

                            </SingleInfoLayout>
                        </aside>
                    </div>
                </div>
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
               <UpdatePersonForm 
                    initValues={data}
                    positiveRequestActions={{
                        //CallbackFunction is one of the four behaviors the useFormUtils hook can apply when a request return a positive answer
                        callbackFunction: requestResponse => {

                            //Redirect to the right path if the slug changes and otherwise, at least reflect the changes
                            Router.push(`/persons/${requestResponse.data.slug}`);
                            
                            //Close the modal 
                            closeModal()
                        }
                    }}
                />
            </Modal>
        }

        {/******** Img Modal Display **********/}
        { 
            img_Modal.modal.display && 
            <Modal 
                className={`${styles["person-form-modal"]}`}
                coloredBackground
                darkColorButton
            >
                <header className="d-flex justify-content-between align-items-center">
                    <h3 className="m-0 fs-4 fw-normal">Téléverser un ficher média</h3>
                    <Button onClick={img_Modal.closeModal} size="slim">Fermer</Button>
                </header>
                {/* Separation line */}
                <div className="border-bottom w-100 my-2"></div>
                <CreateMediaForm
                    initValues={data}
                    positiveRequestActions={{
                        //CallbackFunction is one of the four behaviors the useFormUtils hook can apply when a request return a positive answer
                        callbackFunction: requestResponse => {

                            //Reflect the changes
                            //Router.push(`/persons/${requestResponse.data.slug}`);
                            
                            //Close the modal 
                            img_Modal.closeModal()
                        }
                    }}
                />
            </Modal>
        }
        
    </>
    )
}


export default MainPersonView
