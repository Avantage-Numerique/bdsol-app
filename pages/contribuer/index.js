import { useContext } from 'react' 

//Components
import Button from '../../app/common/FormElements/Buttons/Button/Button'

//Context
import { AuthContext } from '../../authentication/context/auth-context'

//styling
import styles from './contribution-page.module.scss'



const Index = () => {    

    //Import the authentication context
    const auth = useContext(AuthContext);

    return (
        <div className={`col-12 ${styles["contribution-page"]}`}>
            
            <header className={`col-12`}>

                <div className="maxWidthPageContainer">
                    <h1 className={`col-12 blue`}>Créer une donnée</h1>
                    <p>Vous avez accès ici à tous les types de données qu'il est présentement possible d'intégrer à la base de données.</p>
                </div>

            </header>

            <section className={`col-12`}>
                
                {/* Menu for the differents forms */}
                <div className={`maxWidthPageContainer`}>
           
                    <div className={`col-12 ${styles["contribution-page__menu"]}`}>
                        <h4 className="col-12">Sélectionnez le type d'entité que vous voulez ajouter</h4>

                        {/* Not beautiful but it works for now. Let know the user that he needs to be connected to edit the database */}
                        { !auth.isLoggedIn &&
                            <div className="col-12" style={{marginBottom: "1rem"}}>
                                <span className="red"><strong>Attention ! </strong></span>
                                Vous devez être connecté afin de pouvoir éditer la base de données.
                            </div>    
                        }

                        <Button href="/contribuer/personne" disabled={!auth.isLoggedIn}>Personne</Button>
                        <Button color="blue4" href="/contribuer/organisation" disabled={!auth.isLoggedIn}>Organisation</Button>
                        <Button href="/contribuer/taxonomy" disabled={!auth.isLoggedIn}>Taxonomie</Button>
                        <Button disabled>Projet</Button>
                        <Button disabled>Événement</Button>
                        <Button disabled>Matériel</Button>
                        
                    </div>
                    
                </div>

            </section>

        </div>
    )

}

export default Index