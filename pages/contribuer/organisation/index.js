
//Component 
import CreateOrganisationForm from '../../../DataTypes/Organisation/components/forms/CreateOrganisationForm/CreateOrganisationForm'
import Button from '../../../app/common/FormElements/Buttons/Button/Button'


//styling
import styles from './createOrganisation.module.scss'




const CreateOrganisationPage = () => {


    return (
        <div className={`col-12 ${styles["create-organisation-page"]}`}>

                <div className={`col-12 ${styles["create-organisation__return-button"]}`}>
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
                        <div className={`${styles["create-organisation--max-width"]}`}>
                            <h1 className={`col-12 blue`}>Personne</h1>
                            <h4 className="col-12">Super formulaire</h4>
                            <p>Ajoutez ici une entité "Personne" afin de représenter un artiste, artisan ou professionnel de tout domaine que vous jugez pertinent à cette base de données.</p>
                        </div>
                    </div>
                </header>

                <section className="col-12">
                    <div className="maxWidthPageContainer">
                        <div className={`${styles["create-organisation--max-width"]}`}>
                            <CreateOrganisationForm />
                        </div>
                    </div>
                </section>

        </div>
    )
}

export default CreateOrganisationPage