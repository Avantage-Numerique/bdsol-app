

//Component 
import CreatePersonForm from '../../../DataTypes/Person/Components/Forms/CreatePerson/CreatePersonForm'
import Button from '../../../app/common/FormElements/Buttons/Button/Button'

//Styling 
import styles from './createPerson.module.scss'

const CreatePersonPage = () => {

    return (
        
        <div className={`col-12 ${styles["create-person"]}`}>

                <div className={`col-12 ${styles["create-person__return-button"]}`}>
                    <div className="maxWidthPageContainer">
                        <Button 
                            color="blue4"
                            reverse
                            href="/contribuer"
                        >
                            Retour à la page précédente
                        </Button>
                    </div>
                </div>
                <header className={`col-12`}>
                    <div className="maxWidthPageContainer">
                        <div className={`${styles["create-person--max-width"]}`}>
                            <h1 className={`col-12 blue`}>Personne</h1>
                            <h4 className="col-12">Super formulaire</h4>
                            <p>Ajoutez ici une entité "Personne" afin de représenter un artiste, artisan ou professionnel de tout domaine que vous jugez pertinent à cette base de données.</p>
                        </div>
                    </div>
                </header>

                <section className="col-12">
                    <div className="maxWidthPageContainer">
                        <div className={`${styles["create-person--max-width"]}`}>
                            <CreatePersonForm />
                        </div>
                    </div>
                </section>

        </div>
    )

}

export default CreatePersonPage