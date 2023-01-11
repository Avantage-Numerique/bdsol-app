import React from 'react' 

//Components
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml'
import Button from '@/src/common/FormElements/Button/Button'

//Styling 
import styles from './OrganisationSimple.module.scss'


const OrganisationSimple = ({ data }) => {

    const defaultOrgAvatar = '/general_images/Jurassic_Park_Main_Gate.jpg';

    //Destructuring of data's prop
    const {
        //contactPoint,
        createdAt,
        description,
        //fondationDate,
        name,
        offers,
        //slug,
        //status,
        team,
        updatedAt,
        url,
        //__v,
        //_id
    } = data;

    const date_createdAt = new Date(createdAt);
    const date_updatedAt = new Date(updatedAt);

    return (
        <article className={`${styles["org-simple"]}`}>
            
            <header className={`position-relative p-4 d-flex ${styles["org-simple__header"]}`}>
                {/* Background img */}
                <figure className={`position-absolute mb-0 w-100 h-100 top-0 start-0 ${styles["org-simple__background"]}`}>
                    <img 
                        className={`w-100 h-100 ${styles["org-img"]}`}
                        src={defaultOrgAvatar}
                        alt={`${name}`}
                    />
                    <div className={`position-absolute w-100 h-100 top-0 start-0 ${styles["covering-gradient"]}`}></div>
                </figure>

                {/* 
                    Main content of the header 
                    -
                    Appears over the main image
                */}
                <div className="position-relative container">
                    <div className="row h-100">
                        <div className="text-white col-9 d-flex align-items-end">
                            {/* <h2> </h2> */}
                        </div>
                        <div className="col d-flex justify-content-end align-items-start">
                            {/* 
                            <Button
                                size="large"
                            >
                                Modifier
                            </Button>
                            */}
                        </div>
                    </div>
                </div>
            </header>

            <div className="p-4 container">
                <div className="row pt-4">
                    <section className="col col-12 col-md-8">

                        {/******** Header **********/}
                        <header>
                            <h2 className="mt-0 w-100">{name}</h2>
                            <p className="small w-100 my-0"><span>Date de création : </span> {date_createdAt.toLocaleDateString("fr")}</p>
                            {
                                createdAt != updatedAt &&
                                <p className="small w-100"><span>Dernière modification : </span> {date_updatedAt.toLocaleDateString("fr")}</p>
                            }

                        </header>
                        
                        {/******** Description section **********/}
                        {
                            description &&
                            <section className="border-bottom my-4">
                               <SanitizedInnerHtml>
                                    {description}
                               </SanitizedInnerHtml>
                            </section>
                        }

                        {/******** Display of the offer's list **********/}
                        <section className="border-bottom mt-4">
                            <h4 className="h5 my-3">Services offerts</h4>
                            { offers && offers.length > 0 &&
                                <ul className="d-flex flex-wrap gap-2">
                                {
                                    offers &&
                                    offers.map(elem => (
                                        <li 
                                            key={elem.offer._id} 
                                            className="border p-1 rounded-1 small"
                                        >{elem.offer.name}</li>
                                    ))
                                }
                                </ul>
                            }
                            {
                                !offers &&
                                <p className="small">Aucun service n'est proposé pour cette organisation.</p>
                            }
                        </section>

                        {/******** Display of the team members list **********/}
                        <section className="border-bottom mt-4">
                            <h4 className="h5 my-3">Membres de l'équipe</h4>
                            { team && team.length > 0 &&
                                <ul className="d-flex flex-wrap gap-2">
                                {
                                    team &&
                                    team.map(elem => (
                                        <li key={elem.member._id} className="border p-1 rounded-1 small">
                                            {elem.member.firstName} {elem.member.lastName}
                                        </li>
                                    ))
                                }
                                </ul>
                            }
                            {
                                (!team || team.length == 0) &&
                                <p className="small">Personne n'est inscrit comme membre de l'équipe de cette organisation.</p>
                            }
                        </section>
                        
                  

                        

                        

                    </section>
                    <aside className="col col-12 col-md-4">

                        <div className="border-top border-bottom py-3 mb-4">
                            <Button 
                                disabled
                                size="slim-100"
                            >
                                Modifier la fiche
                            </Button>
                        </div>

                        <h4 className="h5">Visiter la page de la ressource</h4>
                        {/********  Outside link *************/}
                        {   url &&
                            <a target="_blank" href={url} rel="noopener noreferrer">
                                <div className="d-flex">
                                    <span className="d-inline-block text-truncate small">https//vincentruel.com/manger-des-bananes/324329u823</span>
                                    <span> &#x2197;</span>
                                </div>
                            </a>
                        }

                        {   !url &&
                            <p className="small">Aucun lien vers cette ressource n'existe pour le moment.</p>
                        }
                        
                    </aside>
                </div>
               
            </div>

        </article>
    )
}

export default OrganisationSimple